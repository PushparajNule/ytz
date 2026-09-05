import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import checkPostOwnership from '../middlewares/post.middleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { signUpSchema } from '../validators/auth.schema.js'
import { signUp } from '../controllers/auth.controllers.js'
import { memoryUpload } from '../utils/multer.js'

const router = express.Router()

router.post("/signUp",memoryUpload.fields([
    {name : "avatar", maxCount : 1},
    {name : "coverImage", maxCount : 1}
]), validateRequest(signUpSchema),   (req, res, next) => {
        console.log("reached");
        next();
    }, signUp)

export default router;