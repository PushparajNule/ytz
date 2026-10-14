import { prisma } from "../db/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const getChannel = AsyncHandler(async (req, res) => {

    const channelName = req.params.username
    const userId = req.user.id

    const {password, refreshToken, ...safeChannel} = await prisma.user.findUnique({
        where : {username : channelName}
    })

    console.log(safeChannel)

    const isSubscribed = !!(await prisma.subscription.findUnique({
        where: {
            subscriberId_channelId: {
                subscriberId: userId,
                channelId: safeChannel.id
            }
        }
    }))

    const subscriberCount = await prisma.subscription.count({
        where : { channelId : safeChannel.id}
    })

    const channel = {...safeChannel, isSubscribed, subscriberCount}

    res.status(200).json(new ApiResponse(200, channel))
})

const subscribe = AsyncHandler(async (req, res) => {

    const channelId = req.params.id
    const userId = req.user.id

    if(channelId === userId){
        throw new ApiError(400, "Cannot Subscribe To Yourself")
    }

    const subscribe = await prisma.subscription.create({
        data : {
            subscriberId : userId,
            channelId : channelId
        }
    })

    res.status(201).json(new ApiResponse(200, subscribe, "Subscribed Successfully"))
})

const unsubscribe = AsyncHandler(async (req, res) => {

    const channelId = req.params.id
    const userId = req.user.id

    const unsubscribe = await prisma.subscription.delete({
        where : {
            subscriberId_channelId : {
                subscriberId : userId,
                channelId : channelId
            }
        }
    })

    res.status(201).json(new ApiResponse(200, unsubscribe, "Unsubscribed Successfully"))
})

export {getChannel, subscribe, unsubscribe}