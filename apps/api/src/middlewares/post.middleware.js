import { prisma } from "../db/db.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";

const checkPostOwnership = asyncHandler(async (req, res, next) => {
    const {id} = req.params

    if(!id){
        throw new ApiError(400, "Invalid Id")
    }

    const post = await prisma.post.findUnique({
        where : {id : id}
    })

    if(!post){
        throw new ApiError(401, "Post Doesnt Exist")
    }

    if(post.owner !== req.user.id){
        throw new ApiError(404, "Not Authorized To Perform This Action")
    }

    req.post = post

    next()
})

export default checkPostOwnership;