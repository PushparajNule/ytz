import multer from 'multer'

const memoryUpload = multer({
    storage : multer.memoryStorage(),
    limits : { fileSize : 5 * 1024 * 1024 },
    fileFilter : (req, file, cb) => {

        const allowed = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp"
        ]

        if (allowed.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid Image Type"))
        }
    }
})

const diskUpload = multer({
    storage : multer.diskStorage({
        destination : "./public",
        filename : (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }),
    limits : { fileSize : 2 * 1024 * 1024 * 1024 },
    fileFilter : (req, file, cb) => {
        const vidoeTypesAllowed = [
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/quicktime"
        ]

        if(file.fieldname == "video"){
            
            if (vidoeTypesAllowed.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new Error("Invalid Video Type"))
            }
        }

        const imageTypesAllowed = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp"
        ]

        if(file.fieldname == "thumbnail"){
            if (imageTypesAllowed.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid Image Type"))
        }
        }
    }
})

export {memoryUpload, diskUpload}