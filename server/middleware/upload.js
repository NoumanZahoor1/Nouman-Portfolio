import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isPdf = file.mimetype === 'application/pdf';
        return {
            folder: 'portfolio',
            format: isPdf ? 'pdf' : undefined, // Let Cloudinary handle image formats
            resource_type: 'auto', // Important for PDFs
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
        };
    },
});

const upload = multer({ storage: storage });

export default upload;
