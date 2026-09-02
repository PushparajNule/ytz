import express from 'express'
import cors from 'cors'
import conf from './conf/conf.js'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middlewares/error.middleware.js'
import ApiResponse from './utils/ApiResponse.js'

const app = express()

app.use(cors({
    origin : conf.CLIENT_URL,
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.get("/api/v1/health", (req, res, next) => {
    try {
        res.status(200).json(new ApiResponse(200, null, "Server is running"))
    } catch (error) {
        next(error)
    }
})

app.use(notFound)
app.use(errorHandler)

export default app;