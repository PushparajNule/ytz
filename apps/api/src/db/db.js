import { PrismaClient } from "../../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import conf from "../conf/conf.js";

const adapter = new PrismaPg({
    connectionString: conf.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
    log: conf.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");
    } catch (error) {
        console.log("Database Error", error.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };