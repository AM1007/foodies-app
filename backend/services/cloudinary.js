import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'foodies-app',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 250, height: 250, crop: 'fill' }],
  },
});

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'foodies-app/avatars',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 250, height: 250, crop: 'fill', gravity: 'face' },
      { quality: 'auto:good' }
    ],
    format: 'webp',
  },
});

const recipeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'foodies-app/recipes',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 1200, crop: 'limit' },
      { quality: 'auto:good' }
    ],
    format: 'webp',
  },
});

// Функції для генерації URL різних розмірів
const getThumbUrl = (originalUrl) => {
  if (!originalUrl) return null;
  return originalUrl.replace('/upload/', '/upload/c_fill,h_300,w_400,q_auto:good/');
};

const getPreviewUrl = (originalUrl) => {
  if (!originalUrl) return null;
  return originalUrl.replace('/upload/', '/upload/c_limit,w_1200,q_auto:good/');
};

export default {
  storage,          
  avatarStorage,    
  recipeStorage,    
  cloudinary,
  getThumbUrl,
  getPreviewUrl
};
