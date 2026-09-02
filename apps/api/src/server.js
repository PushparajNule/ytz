import express from 'express'
import conf from './conf/conf.js'
import { connectDB } from './db/db.js'

const app = express()

connectDB()

const port = conf.PORT

const server = app.listen(port, console.log(`Server is running on port ${port}`))