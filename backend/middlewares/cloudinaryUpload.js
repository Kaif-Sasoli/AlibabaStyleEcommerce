// middlewares/cloudinaryUpload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'alibabaStyleEcommerce',
    allowed_formats: ['png', 'jpg', 'jpeg', 'avif', 'webp'], 
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/avif',
    'image/webp',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;
