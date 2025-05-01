import multer from 'multer';
import cloudinaryServices from '../services/cloudinary.js';

// Middleware для завантаження аватарок користувачів
const upload = multer({ storage: cloudinaryServices.storage });

// Middleware для завантаження зображень рецептів (мініатюри та превью)
const recipeImagesUpload = multer({
  storage: cloudinaryServices.storage,
}).fields([
  { name: 'thumb', maxCount: 1 },
  { name: 'preview', maxCount: 1 },
]);

export default upload;
export { recipeImagesUpload };
