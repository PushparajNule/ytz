import dotenv from "dotenv"

dotenv.config()

const conf = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    
}

export default conf;