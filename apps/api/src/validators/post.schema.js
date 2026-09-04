import {z} from 'zod'

const createPostSchema = z.object({
    title : z.string().min(1, {
        message : "Title Is Required"
    }).max(64, {
        message : "Title Limit Exceeded"
    }),

    description : z.string().max(256, {
        message : "Description Limit Exceeded"
    }),

    status : z.enum(["PUBLIC", "PRIVATE"]),
})

const updatePostSchema = createPostSchema.partial()

const paramSchema = z.string().uuid().min(1, {
    message : "Invalid Id"
})

const deletePostSchema = paramSchema

const getUserPostSchema = paramSchema

const getPostSchema = paramSchema