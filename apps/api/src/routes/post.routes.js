import express from 'express'
import { createPost, deletePost, dislikePost, getAllPosts, getAllPostsBySubs, getAllPostsByUser, getPost, likePost, updatePost } from '../controllers/post.controllers.js';
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

route.post("/dislikePost/:id", authMiddleware, validateRequest(paramSchema, "params", dislikePost))

export default route;