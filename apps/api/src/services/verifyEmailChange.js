import nodemailer from 'nodemailer'
import conf from '../conf/conf.js'

const transporter = nodemailer.createTransport({
    host : conf.MAILTRAP_HOST,
    port : conf.MAILTRAP_PORT,
    auth : {
        user : conf.MAILTRAP_USER,
        pass : conf.MAILTRAP_PASSWORD
    }
})

export default transporter;