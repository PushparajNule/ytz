import { prisma } from '../db/db.js'
import uploadToCloudinary from '../services/uploadToCloud.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import AsyncHandler from '../utils/AsyncHandler.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/GenerateToken.js'
import generateEmailVerificationToken from '../utils/EmailVerificationToken.js'
import redisClient from '../utils/Redis.js'
import transporter from '../services/verifyEmailChange.js'
import crypto from 'crypto'

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
        const result = await Promise(uploadToCloudinary(coverImage, "ytz"))
        
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

    const {password , refreshToken, ...safeUser} = req.user

    res.status(200).json(new ApiResponse(200, safeUser))
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

const changeEmail = AsyncHandler(async (req, res) => {
    const {newEmail} = req.body

    if(!newEmail){
        throw new ApiError(400, "New Email Is Required")
    }

    if(newEmail === req.user.email){
        throw new ApiError(400, "Email Already In Use")
    }

    const emailExists = await prisma.user.findUnique({
        where : { email : newEmail}
    })

    if(emailExists){
        throw new ApiError(400, "Email Already In Use")
    }

    const {token, tokenHash,  verificationURL} = generateEmailVerificationToken()

    await redisClient.set(
        `email-verification:${tokenHash}`,
        JSON.stringify({
            userId : req.user.id,
            email : newEmail,
            tokenHash : tokenHash
        }),
        {
            EX : 900
        }
    )

    await transporter.sendMail({
        from : '"ytz" <noreply@example.com',
        to : "test@example.com",
        subject : "Email Verification For Email Change",
        text : `Click On The Link Below To Verify Email. Link Is Valid Only 15 Mins - ${verificationURL}`
    })

    res.status(200).json(new ApiResponse(200, "Verification Link Sent"))
})

const verifyEmailChange = AsyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        throw new ApiError(400, "Verification Token Required");
    }

    const incomingTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const redisKey = `email-verification:${incomingTokenHash}`;

    console.log(redisKey)

    const data = await redisClient.get(redisKey);

    console.log(data)

    if (!data) {
        throw new ApiError(404, "Verification Token Expired");
    }

    const verificationData = JSON.parse(data);

    await prisma.user.update({
        where: {
            id: verificationData.userId
        },
        data: {
            email: verificationData.email
        }
    });

    await redisClient.del(redisKey);

    res.status(200).json(new ApiResponse(200, null, "Email Changed"));
})

const updateAccountDetails = AsyncHandler(async (req, res) => {
    const {username, description} = req.body
    
    if(username === req.user.username){
        throw new ApiError(400, "Username Already In Use")
    }

    if(username && username !== undefined){
        const usernameExists = await prisma.user.findUnique({
            where : {username : username}
        })

    if(usernameExists){
        throw new ApiError(400, "Username Already In Use")
    }
    }

    const user = await prisma.user.update({
        where : {id : req.user.id},
        data : {
            ...(username !== undefined && { username }),
            ...(description !== undefined && { description })
        },
    })

    const { password, refreshToken, ...safeUser } = user

    res.status(200).json(new ApiResponse(200, safeUser, "Account Details Updated"))
})

const updateAvatar = AsyncHandler(async (req, res) => {
    const avatar = req.file

    const result = await uploadToCloudinary(avatar, "ytz")

    const avatarURL = result?.secure_url

    if(!avatarURL){
        throw new ApiError(500, "Image Upload Failed")
    }

    const user = await prisma.user.update({
        where : {id : req.user.id},
        data : {avatar : avatarURL}
    })

    const { password, refreshToken, ...safeUser } = user

    res.status(201).json(new ApiResponse(201, safeUser, "Avatar Update Successfull"))
})

const updateCoverImage = AsyncHandler(async (req, res) => {
    const coverImage = req.file

    const result = await uploadToCloudinary(coverImage, "ytz")

    const coverImageURL = result?.secure_url

    if(!coverImageURL){
        throw new ApiError(500, "Image Upload Failed")
    }

    const user = await prisma.user.update({
        where : {id : req.user.id},
        data : {coverImage : coverImageURL}
    })

    const { password, refreshToken, ...safeUser } = user

    res.status(201).json(new ApiResponse(201, safeUser, "Cover Image Update Successfull"))
})

export {signUp, login, logout, currentUser, changePassword, changeEmail, verifyEmailChange, updateAccountDetails, updateAvatar, updateCoverImage}