import { prisma } from '../db/db.js'
import uploadToCloudinary from '../services/uploadToCloud.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import AsyncHandler from '../utils/AsyncHandler.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js'

const signUp = AsyncHandler(async (req, res) => {
    const {username, email, password, description} = req.body

    if(!username || !email || !password){
        throw new ApiError(400, "Username/Email/Password Are Required")
    }

    const userExists = await prisma.user.findFirst({
        where : {
            OR : [
                {
                    username : username,
                    email : email
                }
            ]
        }
    })
    
    if(userExists){
        throw new ApiError(409, "Username/Email Already In Use")
    }

    const avatar = req?.files?.avatar?.[0]
    const coverImage = req?.files?.coverImage?.[0]

    let avatarURL;
    let coverImageURL;

    if(avatar){
        const result = await uploadToCloudinary(avatar, "ytz")
        
        avatarURL = result?.secure_url;
    }

    if(coverImage){
        const result = await Promise(uploadToCloudinary(avatar, "ytz"))
        
        coverImageURL = result?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data : {
            username : username,
            email : email,
            password : hashedPassword,
            avatar : avatarURL,
            coverImage : coverImageURL,
            description : description
        }
    })

    const accessToken = await generateAccessToken(user.id, res)
    const refreshToken = await generateRefreshToken(user.id, res)

    await prisma.user.update({
        where : { id : user.id },
        data : { refreshToken : refreshToken}
    })
    
    return res.status(201).json(
        new ApiResponse(
            201,
            "SignUp Complete",
            {
                username: user.username,
                email: user.email,
                description: user.description,
                sessionId: accessToken
            }
        )
    )

})

const login = AsyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if(!username && !email){
        throw new ApiError(400, "Username Or Email Is Required")
    }

    if(!password){
        throw new ApiError(400, "Password Is Required")
    }

    const user = await prisma.user.findFirst({
        where : {
            OR : [{
                username : username,
                email : email
            }]
        }
    })

    if(!user){
        throw new ApiError(404, "User Not Found")
    }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if(!verifyPassword){
        throw new ApiError(401, "Invalid Credentials")
    }

    const token = await generateAccessToken(user.id, res)

    res.status(200).json(
        new ApiResponse(200, {
            id : user.id,
            username : user.username,
            sessionId : token
        }, "Login Successful")
    )
})

const logout = AsyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    res.status(200).json(new ApiResponse(200, null, "Logout Successful"))
})

const currentUser = AsyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, {id : req.user.id, username : req.user.username, email : req.user.email}))
})

const changePassword = AsyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body

    if(oldPassword === newPassword){
        throw new ApiError(400, "Passwords Cannot Be Same")
    }

    const user = req.user

    const verifyPassword = await bcrypt.compare(oldPassword, user.password)

    if(!verifyPassword){
        throw new ApiError(400, "Invalid Old Password")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where : {id : user.id},
        data : { password : hashedPassword}
    })

    res.status(200).json(new ApiResponse(200, null, "Password Changed Successfully"))
})

export {signUp, login, logout, currentUser, changePassword}