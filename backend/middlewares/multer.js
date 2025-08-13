import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload files temporaliy to the disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    }
});

// filter the file type`
const fileFilter = (req, file, cb) => {
     console.log('File MIME type:', file.mimetype);
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/avif', 'image/webp', 
                          'video/mp4', 'video/mkv', 'video/mov', 'video/avi'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new Error('Only JPEG, PNG, AVIF, MP4, MKV, MOV, WEBP, and AVI files are allowed.');
        error.status = 400;  
        cb(error, false); 
        }
};
// Upload files
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

export default upload