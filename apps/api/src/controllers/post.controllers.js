import { prisma } from "../db/db.js";
import {deleteFromCloudinary, uploadToCloudinary, videoUploadToCloudinary} from "../services/uploadToCloud.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const createPost = AsyncHandler(async (req, res) => {
    const {status, title, description} = req.body
    const thumbnail = req?.files?.thumbnail?.[0]
    const video = req?.files?.video?.[0]

    let thumbnailURL;
    let thumbnailPublicURL;

    if(thumbnail){
        const result = await videoUploadToCloudinary(thumbnail, "ytz", "image")

        thumbnailURL = result.secure_url
        thumbnailPublicURL = result.public_id
    }

    let videoURL;
    let videoPublicURL;

    if(video){
        const result = await videoUploadToCloudinary(video, "ytz", "video")

        videoURL = result.secure_url
        videoPublicURL = result.public_id
    }

    const post = await prisma.post.create({
        data : {
            status : status,
            video : videoURL,
            videoPublicURL : videoPublicURL,
            title : title,
            ...(thumbnailURL !== undefined && {thumbnail : thumbnailURL}),
            ...(description !== undefined && {description}),
            ...(thumbnailPublicURL !== undefined && {thumbnailPublicURL}),
            user : {
                connect : {
                    id : req.user.id
                }
            }
        }
    })

    res.status(201).json(new ApiResponse(201, post, "Post Created"))
})

const updatePost = AsyncHandler(async (req, res) => {
    const {status, title, description} = req.body
    const thumbnail = req.file
    const postId = req.params.id

    let thumbnailURL;
    let thumbnailPublicURL;

    if(thumbnail){
        const result = await uploadToCloudinary(thumbnail, "ytz")

        thumbnailURL = result.secure_url
        thumbnailPublicURL = result.public_id
    }

    const post = await prisma.post.update({
        where : {id : postId},
        data : {
            ...(status !== undefined && {status}),
            ...(title !== undefined && {title}),
            ...(description !== undefined && {description}),
            ...(thumbnailURL !== undefined && {thumbnail : thumbnailURL}),
            ...(thumbnailPublicURL !== undefined && {thumbnailPublicURL})
        }
    })

    res.status(200).json(new ApiResponse(200, post, "Post Updated"))
})

const getPost = AsyncHandler(async (req, res) => {
    const postId = req.params

    const post = await prisma.post.findUnique({
        where : postId
    })

    res.status(200).json(new ApiResponse(200, post))
})

const deletePost = AsyncHandler(async (req, res) => {
    const postId = req.params
    const thumbnailPublicId = req.post.thumbnailPublicURL
    const videoPublicId = req.post.videoPublicURL

    await deleteFromCloudinary(thumbnailPublicId)
    await deleteFromCloudinary(videoPublicId, "video")

    await prisma.post.delete({
        where : postId
    })

    res.status(200).json(new ApiResponse(200, null, "Post Deleted Successfully"))
})

export {createPost, updatePost, getPost, deletePost}