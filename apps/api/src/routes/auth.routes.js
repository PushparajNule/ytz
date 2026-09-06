import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import checkPostOwnership from '../middlewares/post.middleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { changePasswordSchema, cookieSchema, loginSchema, signUpSchema } from '../validators/auth.schema.js'
import { changePassword, currentUser, login, logout, signUp } from '../controllers/auth.controllers.js'
import { memoryUpload } from '../utils/multer.js'

const router = express.Router()

router.post("/signUp",memoryUpload.fields([
    {name : "avatar", maxCount : 1},
    {name : "coverImage", maxCount : 1}
]), validateRequest(signUpSchema), signUp)

router.post("/login", validateRequest(loginSchema), login)

router.post("/logout", authMiddleware, validateRequest(cookieSchema, "cookies"), logout)

router.get("/current-user", authMiddleware, validateRequest(cookieSchema, "cookies"), currentUser)

router.post("/changePassword", authMiddleware, validateRequest(changePasswordSchema), changePassword)

export default router;