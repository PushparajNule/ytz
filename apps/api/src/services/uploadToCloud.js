import cloudinary from "../db/cloudinary.js";
import fs from 'fs/promises'

const uploadToCloudinary = async (file, folder, resourceType = "image") => {
    if (!file?.buffer?.length) {
        throw new Error("Empty file buffer");
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary error:", error);
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        stream.end(file.buffer);
    });
}

const videoUploadToCloudinary = async (file, folder, resourceType = "image") => {
    if (!file?.path) {
        throw new Error("File path is missing");
    }

    try {
        const result = await cloudinary.uploader.upload(
            file.path,
            {
                folder,
                resource_type: resourceType
            }
        );

        await fs.unlink(file.path);

        return result;
    } catch (error) {
        // Remove local file even if Cloudinary fails
        try {
            await fs.unlink(file.path);
        } catch {}

        throw error;
    }
}

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    if (!publicId) {
        throw new Error("Cloudinary public ID is missing");
    }

    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType
    });

    console.log({
        publicId,
        resourceType,
        cloudinaryResult: result
    });

    if (result.result !== "ok") {
        throw new Error(
            `Cloudinary deletion failed: ${result.result}`
        );
    }

    return result;
}

export {uploadToCloudinary, videoUploadToCloudinary, deleteFromCloudinary}