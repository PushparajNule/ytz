import jwt from 'jsonwebtoken'
import { prisma } from '../db/db.js';
import asyncHandler from '../utils/AsyncHandler.js'
import ApiError from '../utils/ApiError.js';
import conf from '../conf/conf.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if(req.cookies?.accessToken){
        token = req.cookies?.accessToken
    } else if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new ApiError(401, "Not Authorized To Perform This Action")
    }

    let decoded;

    try {
        decoded = jwt.verify(token, conf.JWT_SECRET)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError
    ) {
        throw new ApiError(401, "Invalid or Expired Access Token");
    }

    throw error;
    }

    const user = await prisma.user.findUnique({
        where : {id : decoded.id}
    })
    
    if(!user){
        throw new ApiError(401, "User Doesnt Exist")
    }

    req.user = user

    next();
})

export default authMiddleware;