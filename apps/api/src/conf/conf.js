import dotenv from "dotenv"

dotenv.config()

const conf = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
    CLIENT_URL : process.env.CLIENT_URL
}

export default conf;