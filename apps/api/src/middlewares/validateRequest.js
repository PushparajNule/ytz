import ApiError from '../utils/ApiError.js'

const validateRequest = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source])

        if (!result.success) {
            const errors = result.error.issues.map(
                (issue) => issue.message
            )

            return res.status(400).json(
                new ApiError(400, "Validation Error",errors.join(", "))
            )
        }

        req[source] = result.data
        next()
    }
}

export {validateRequest}