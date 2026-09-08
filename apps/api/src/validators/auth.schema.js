import {z} from 'zod'

const usernameSchema = z.string().min(4, {
        message : "Username Is Too Short"
    }).max(12, {
        message : "Username Is Too Long"
    }).regex(/^[a-zA-Z0-9]+$/, {
        message : "Invalid Username"
    })

const passwordSchema = z.string().min(8, {
        message : "Password Is Too Short"
    }).regex(/^[a-zA-Z0-9]+$/, {
        message : "Password Is Too Weak"
    })

const signUpSchema = z.object({
    username : usernameSchema,
    
    password : passwordSchema,

    email : z.email({
        message : "Invalid Username"
    }),
})

const loginSchema = z.object({
    username : usernameSchema.optional(),

    email : z.email({
        message : "Invalid Username"
    }).optional(),

    password : passwordSchema
})

const cookieSchema = z.object({
    accessToken : z.string().min(1)
})

const changePasswordSchema = z.object({
    oldPassword : passwordSchema,

    newPassword : passwordSchema
})

const updateAccountDetailsSchema = z.object({
    username : usernameSchema.optional(),

    description : z.string().optional()
})

export {signUpSchema, loginSchema, cookieSchema, changePasswordSchema, updateAccountDetailsSchema}