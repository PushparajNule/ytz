import cloudinary from "../db/cloudinary.js";
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

    
    let videoURL;
    let videoPublicURL;
    
    if(video){
        const result = await videoUploadToCloudinary(video, "ytz", "video")
        
        videoURL = result.secure_url
        videoPublicURL = result.public_id
    }
    
    if(thumbnail){
        const result = await videoUploadToCloudinary(thumbnail, "ytz", "image")

        thumbnailURL = result.secure_url
        thumbnailPublicURL = result.public_id
    } else {
        thumbnailURL = cloudinary.url(videoPublicURL + ".jpg", {
            resource_type: "video",
            type: "upload",
            transformation: [
                { start_offset: "auto" },
                {
                    width: 1920,
                    height: 1080,
                    crop: "fill",
                    gravity: "auto"
                },
                { quality: "auto:good" },
                { fetch_format: "jpg" }
            ]
        })
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
    const postId = req.params.id

    const result = await prisma.post.findUnique({
        where : {id : postId},
        include : {
            user : true
        }
    })

    const isPostLiked = !!(await prisma.likes.findUnique({
        where : {
            userId_postId : {
                userId : req.user.id,
                postId : postId
            }
        }
    }))

    const isPostDisliked = !!(await prisma.dislikes.findUnique({
        where : {
            userId_postId : {
                userId : req.user.id,
                postId : postId
            }
        }
    }))

    const isSubscribed = !!(await prisma.subscription.findUnique({
        where: {
            subscriberId_channelId: {
                subscriberId: req.user.id,
                channelId: result.owner
            }
        }
    }))

    const subscriberCount = await prisma.subscription.count({
        where : { channelId : result.owner}
    })

    const likeCount = await prisma.likes.count({
        where : {postId : postId}
    })

    const dislikeCount = await prisma.dislikes.count({
        where : {postId : postId}
    })

    const post = {...result, isPostLiked, isPostDisliked, isSubscribed, subscriberCount, likeCount, dislikeCount}

    res.status(200).json(new ApiResponse(200, post))
})

const getAllPosts = AsyncHandler(async (req, res) => {

    const posts = await prisma.post.findMany({
        where : { status : "PUBLIC" },
        include : { user : {
            select : {
                avatar : true,
                username : true
            }
        } },
        orderBy : { createdAt : "desc"}
    })

    res.status(200).json(new ApiResponse(200, posts))
})

const getAllPostsByUser = AsyncHandler(async (req, res) => {

    const userId = req.params.id

    const posts = await prisma.post.findMany({
        where : { owner : userId },
        include : { user : {
            select : {
                avatar : true,
                username : true
            }
        } },
        orderBy : { createdAt : "desc"}
    })

    res.status(200).json(new ApiResponse(200, posts))
})

const getAllPostsBySubs = AsyncHandler(async (req, res) => {

    const userId = req.user.id

    const subsscriptions = await prisma.subscription.findMany({
        where : {
            subscriberId : userId
        }
    })

    const channelIds = subsscriptions.map((channel) => channel.channelId)

    const posts = await prisma.post.findMany({
        where : {
            owner : {
                in : channelIds
            }
        },

        orderBy : {
            createdAt : "desc"
        }
    })

    res.status(200).json(new ApiResponse(200, posts))
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

const likePost = AsyncHandler(async (req, res) => {

    const postId = req.params.id
    const userId = req.user.id

    await prisma.likes.create({
        data : {
            userId : userId,
            postId : postId
        }
    })

    const result = await prisma.dislikes.findUnique({
        where : {
            userId_postId : {
                userId : userId,
                postId : postId
            }
        }
    })

    if(result){
        await prisma.dislikes.delete({
        where : {
            userId_postId : {
                userId : userId,
                postId : postId
            }
        }
    })
    }

    res.status(201).json(new ApiResponse(201, null, "Post Liked Successfully"))
})

const dislikePost = AsyncHandler(async (req, res) => {

    const postId = req.params.id
    const userId = req.user.id

    await prisma.dislikes.create({
        data : {
            userId : userId,
            postId : postId
        }
    })

    const result = await prisma.likes.findUnique({
        where : {
            userId_postId : {
                userId : userId,
                postId : postId
            }
        }
    })

    console.log(result)

    if(result){
        await prisma.likes.delete({
        where : {
            userId_postId : {
                userId : userId,
                postId : postId
            }
        }
    })
    }

    res.status(201).json(new ApiResponse(201, null, "Post Disliked Successfully"))
})

const unlikePost = AsyncHandler(async (req, res) => {

    const postId = req.params.id

    await prisma.likes.delete({
        where : {
            userId_postId : {
                userId : req.user.id,
                postId : postId
            }
        }
    })

    res.status(200).json(new ApiResponse(200, null, "Post Unliked Successfully"))
})

const undislikePost = AsyncHandler(async (req, res) => {

    const postId = req.params.id

    await prisma.dislikes.delete({
        where : {
            userId_postId : {
                userId : req.user.id,
                postId : postId
            }
        }
    })

    res.status(200).json(new ApiResponse(200, null, "Post Undisliked Successfully"))
})

export {createPost, updatePost, getPost, deletePost, getAllPosts, getAllPostsByUser, getAllPostsBySubs, likePost, dislikePost, unlikePost, undislikePost}