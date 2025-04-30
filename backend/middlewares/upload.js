import multer from 'multer';
import cloudinaryServices from '../services/cloudinary.js';

const upload = multer({ storage: cloudinaryServices.storage });

export default upload;
