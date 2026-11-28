import express from 'express'
import { createPost, createWatchHistory, deletePost, deleteWatchHistory, dislikePost, getAllLikedPostsByUser, getAllPosts, getAllPostsBySubs, getAllPostsByUser, getPost, getPostWatchHistory, getWatchHistory, likePost, undislikePost, unlikePost, updatePost, updateWatchHistory } from '../controllers/post.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createPostSchema, paramSchema, updatePostSchema } from '../validators/post.schema.js';
import { diskUpload, memoryUpload } from '../utils/Multer.js';
import checkPostOwnership from '../middlewares/post.middleware.js';

const route = express.Router()

route.post("/createPost", authMiddleware, diskUpload.fields([
    {name : "thumbnail", maxCount : 1},
    {name : "video", maxCount : 1}
]), validateRequest(createPostSchema), createPost)

route.patch("/updatePost/:id", authMiddleware, checkPostOwnership, validateRequest(paramSchema, "params"), validateRequest(updatePostSchema), updatePost)

route.get("/getPost/:id", authMiddleware, validateRequest(paramSchema, "params"), getPost)

route.delete("/deletePost/:id", authMiddleware, checkPostOwnership, validateRequest(paramSchema, "params"), deletePost)

route.get("/getAllPosts", getAllPosts)

route.get("/getAllPostsByUser/:id", authMiddleware, validateRequest(paramSchema, "params"), getAllPostsByUser)

route.get("/getAllPostsBySubs", authMiddleware, getAllPostsBySubs)

route.post("/likePost/:id", authMiddleware, validateRequest(paramSchema, "params"), likePost)

route.post("/dislikePost/:id", authMiddleware, validateRequest(paramSchema, "params"), dislikePost)

route.post("/unlikePost/:id", authMiddleware, validateRequest(paramSchema, "params"), unlikePost)

route.post("/undislikePost/:id", authMiddleware, validateRequest(paramSchema, "params"), undislikePost)

route.get("/getAllLikedPostsByUser", authMiddleware, getAllLikedPostsByUser)

route.post("/createWatchHistory/:id", authMiddleware, validateRequest(paramSchema, "params"), createWatchHistory)

route.patch("/updateWatchHistory", authMiddleware, updateWatchHistory)

route.get("/getWatchHistory", authMiddleware, getWatchHistory)

route.delete("/deleteWatchHistory/:id", authMiddleware, validateRequest(paramSchema, "params"), deleteWatchHistory)

route.get("/getPostWatchHistory/:id", authMiddleware, validateRequest(paramSchema, "params"), getPostWatchHistory)

export default route;