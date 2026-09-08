import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import checkPostOwnership from '../middlewares/post.middleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { changePasswordSchema, cookieSchema, loginSchema, signUpSchema, updateAccountDetailsSchema } from '../validators/auth.schema.js'
import { changeEmail, changePassword, currentUser, login, logout, signUp, updateAccountDetails, updateAvatar, updateCoverImage, verifyEmailChange } from '../controllers/auth.controllers.js'
import { memoryUpload } from '../utils/Multer.js'

const router = express.Router()

router.post("/signUp",memoryUpload.fields([
    {name : "avatar", maxCount : 1},
    {name : "coverImage", maxCount : 1}
]), validateRequest(signUpSchema), signUp)

router.post("/login", validateRequest(loginSchema), login)

router.post("/logout", authMiddleware, validateRequest(cookieSchema, "cookies"), logout)

router.get("/current-user", authMiddleware, validateRequest(cookieSchema, "cookies"), currentUser)

router.post("/changePassword", authMiddleware, validateRequest(changePasswordSchema), changePassword)

router.post("/changeEmail", authMiddleware, changeEmail)

router.post("/verify-email-change", verifyEmailChange)

router.patch("/updateAccountDetails",authMiddleware, validateRequest(updateAccountDetailsSchema), updateAccountDetails)

router.patch("/updateAvatar", authMiddleware, memoryUpload.single("avatar"), updateAvatar)

router.patch("/updateCoverImage", authMiddleware, memoryUpload.single("coverImage"), updateCoverImage)

export default router;