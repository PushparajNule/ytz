import apiResponse from '../utils/ApiResponse.js'

const validateRequest = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.SafeParse(req[source])

        if(!result.success){
            const errors = result.error.issues.map((issue) => issue.message)

            return apiResponse(400, errors.join(", "), null)
        }

        req[source] = result.data
        next()
    }
}

