import conf from './conf/conf.js'
import { connectDB, disconnectDB } from './db/db.js'
import app from './app.js'

const port = conf.PORT

const startServer = async () => {
    try {
        await connectDB()

        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })

        process.on("unhandledRejection", (err) => {
            console.error("Unhandled Rejection:", err)

            server.close(async () => {
                await disconnectDB()
                process.exit(1)
            })
        })

        process.on("uncaughtException", async (err) => {
            console.error("Uncaught Exception:", err)

            server.close(async () => {
                await disconnectDB()
                process.exit(1)
            })
        })

        process.on("SIGTERM", async () => {
            console.log("SIGTERM received, shutting down gracefully")

            server.close(async () => {
                await disconnectDB()
                process.exit(0)
            })
        })

        process.on("SIGINT", async () => {
            console.log("SIGINT received, shutting down gracefully")

            server.close(async () => {
                await disconnectDB()
                process.exit(0)
            })
        })

    } catch (error) {
        console.error("Failed to start server:", error)

        await disconnectDB()
        process.exit(1)
    }
}

startServer()