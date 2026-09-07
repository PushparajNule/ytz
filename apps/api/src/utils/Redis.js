import {createClient} from 'redis'
import conf from '../conf/conf.js'

const redisClient = createClient({
    url : conf.REDIS_URL
})

redisClient.on("error", (err) => {
    console.log("Redis Error: ",err)
})

await redisClient.connect()

export default redisClient;