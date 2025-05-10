import multer from 'multer';
import cloudinaryServices from '../services/cloudinary.js';

// Оновлений middleware для завантаження аватарів
const upload = multer({ 
  storage: cloudinaryServices.avatarStorage // Використовуємо нову конфігурацію для аватарів
}).single('avatar');

// Оновлений middleware для завантаження зображень рецептів
const recipeImagesUpload = multer({
  storage: cloudinaryServices.recipeStorage // Використовуємо нову конфігурацію для рецептів
}).fields([
  { name: 'thumb', maxCount: 1 },
  { name: 'preview', maxCount: 1 },
  { name: 'photo', maxCount: 1 } // Додаємо підтримку поля 'photo'
]);

// Додаємо новий middleware для обробки URL зображень
const processRecipeImages = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next();
    }
    
    // Для відлагодження
    console.log('Processing files:', Object.keys(req.files));
    
    // Визначаємо оригінальний URL (з пріоритетом)
    let originalUrl = null;
    
    if (req.files.photo && req.files.photo.length > 0) {
      originalUrl = req.files.photo[0].path;
    } else if (req.files.preview && req.files.preview.length > 0) {
      originalUrl = req.files.preview[0].path;
    } else if (req.files.thumb && req.files.thumb.length > 0) {
      originalUrl = req.files.thumb[0].path;
    }
    
    if (originalUrl) {
      // Генеруємо URLs для різних розмірів
      const thumbUrl = cloudinaryServices.getThumbUrl(originalUrl);
      const previewUrl = cloudinaryServices.getPreviewUrl(originalUrl);
      
      // Додаємо URLs до req.body для збереження в БД
      req.body.thumb = thumbUrl;
      req.body.preview = previewUrl;
      
      // Для відлагодження
      console.log('Generated image URLs:', { 
        original: originalUrl, 
        thumb: thumbUrl, 
        preview: previewUrl 
      });
    }
    
    next();
  } catch (error) {
    console.error('Error processing recipe images:', error);
    next(error);
  }
};

export default upload; // Для зворотної сумісності
export { recipeImagesUpload, processRecipeImages };