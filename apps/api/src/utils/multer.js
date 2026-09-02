import multer from 'multer'

const memoryUpload = multer({
    storage : multer.memoryStorage(),
    limits : 5 * 1024 * 1024,
    fileFilter : (req, file, cb) => {
        const allowed = [
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
    limits : 2 * 1024 * 1024 * 1024,
    fileFilter : (req, file, cb) => {
        const allowed = [
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/quicktime"
        ]

        if (allowed.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid Video Type"))
        }
    }
})

export default {memoryUpload, diskUpload}