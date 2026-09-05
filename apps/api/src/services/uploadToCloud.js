import cloudinary from "../db/cloudinary.js";

const uploadToCloudinary = async (file, folder) => {

    console.log("cloudinary reached")
    if (!file) return null;

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        stream.end(file.buffer);
    });
};

export default uploadToCloudinary;