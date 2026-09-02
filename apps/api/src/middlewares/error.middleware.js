import { Prisma } from "../../generated/prisma/client.ts";

const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} Not Found`);

    error.statusCode = 404;

    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid Data Provided";
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const field = err.meta?.target?.[0] || "Field";

            statusCode = 409;
            message = `${field} Already Exists`;
        }

        if (err.code === "P2025") {
            statusCode = 404;
            message = "Record Not Found";
        }

        if (err.code === "P2003") {
            statusCode = 400;
            message = "Invalid Reference: Related Record Does Not Exist";
        }
    }

    res.status(statusCode).json({
        status: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack
        })
    });
};

export { notFound, errorHandler };