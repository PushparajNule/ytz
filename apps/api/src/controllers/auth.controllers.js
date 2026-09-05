import { prisma } from '../db/db.js'
import uploadToCloudinary from '../services/uploadToCloud.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/AsyncHandler.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js'

const signUp = asyncHandler(async (req, res) => {
    const {username, email, password, description} = req.body

    console.log("signUp reached")
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

    console.log({
    username,
    email,
    avatar: avatarURL,
    coverImage: coverImageURL,
    description,
});

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

export {signUp}