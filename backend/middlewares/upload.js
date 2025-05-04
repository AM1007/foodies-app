import multer from 'multer';
import cloudinaryServices from '../services/cloudinary.js';

const upload = multer({ storage: cloudinaryServices.storage });

const recipeImagesUpload = multer({
  storage: cloudinaryServices.storage,
}).fields([
  { name: 'thumb', maxCount: 1 },
  { name: 'preview', maxCount: 1 },
]);

export default upload;
export { recipeImagesUpload };
