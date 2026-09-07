import dotenv from "dotenv"

dotenv.config()

const conf = {
    PORT : process.env.PORT,
    DATABASE_URL : process.env.DATABASE_URL,
    NODE_ENV : process.env.NODE_ENV,
    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
    CLIENT_URL : process.env.CLIENT_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRES_IN : process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN : process.env.REFRESH_TOKEN_EXPIRES_IN,
    MAILTRAP_HOST : process.env.MAILTRAP_HOST,
    MAILTRAP_PORT : process.env.MAILTRAP_PORT,
    MAILTRAP_USER : process.env.MAILTRAP_USER,
    MAILTRAP_PASSWORD : process.env.MAILTRAP_PASSWORD,
    REDIS_URL : process.env.REDIS_URL
}

export default conf;