import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { paramSchema } from '../validators/post.schema.js'
import { getChannel, subscribe, unsubscribe } from '../controllers/subs.controllers.js'

const route = express.Router()

route.get('/getChannel/:username', authMiddleware, validateRequest(paramSchema, "params"), getChannel)
route.post('/subscribe/:id', authMiddleware, validateRequest(paramSchema, "params"), subscribe)
route.delete('/unsubscribe/:id', authMiddleware, validateRequest(paramSchema, "params"), unsubscribe)

export default route;