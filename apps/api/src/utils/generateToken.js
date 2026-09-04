import jwt from 'jsonwebtoken'
import conf from '../conf/conf.js'

const generateRefreshToken = async (userId, res) => {
    const payload = {id : userId}

    const token = jwt.sign(payload, conf.JWT_SECRET, {
        expiresIn : conf.REFRESH_TOKEN_EXPIRES_IN
    })

    res.cookie("refreshToken", token, {
        httpOnly : true,
        secure : conf.NODE_ENV === 'production',
        sameSite : "strict",
        maxAge : (1000 * 60 * 60 * 24) * 7
    })

    return token;
}

const generateAccessToken = async (userId, res) => {
    const payload = {id : userId}

    const token = jwt.sign(payload, conf.JWT_SECRET, {
        expiresIn : conf.ACCESS_TOKEN_EXPIRES_IN
    })

    res.cookie("accessToken", token, {
        httpOnly : true,
        secure : conf.NODE_ENV === 'production',
        sameSite : "strict",
        maxAge : (1000 * 60) * 30
    })

    return token;
}