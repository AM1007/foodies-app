// updateUser.js
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import User from '../db/models/User.js';
import { connectToDatabase } from '../db/sequelize.js';
import dotenv from 'dotenv';

// Завантажуємо змінні середовища
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфігурація cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Функція для завантаження файлу до Cloudinary
const uploadToCloudinary = async filePath => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: 'gordon_ramsay_avatar',
      folder: 'avatars',
      overwrite: true,
    });
    console.log(`Успішно завантажено зображення, URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Помилка завантаження:`, error);
    return null;
  }
};

async function updateUser() {
  try {
    await connectToDatabase();
    console.log('Підключено до бази даних');

    // Шлях до зображення
    const imagePath = path.join(__dirname, '..', 'temp', 'Chef.webp');

    // Перевіряємо наявність файлу
    if (!fs.existsSync(imagePath)) {
      console.error(`Файл ${imagePath} не існує`);
      process.exit(1);
    }

    // Завантажуємо до Cloudinary
    const imageUrl = await uploadToCloudinary(imagePath);

    if (!imageUrl) {
      console.error('Не вдалося отримати URL зображення з Cloudinary');
      process.exit(1);
    }

    // Оновлюємо користувача з ID 1
    const user = await User.findByPk(1);

    if (!user) {
      console.error('Користувач з ID 1 не знайдений');
      process.exit(1);
    }

    // Зберігаємо старі дані для логування
    const oldName = user.name;
    const oldAvatar = user.avatar;

    // Оновлюємо користувача
    await user.update({
      name: 'Gordon Ramsay',
      avatar: imageUrl,
    });

    console.log(`Користувач успішно оновлений:`);
    console.log(`- Старе ім'я: ${oldName} -> Нове ім'я: Gordon Ramsay`);
    console.log(`- Старий аватар: ${oldAvatar}`);
    console.log(`- Новий аватар: ${imageUrl}`);

    console.log('Оновлення користувача завершено');
    process.exit(0);
  } catch (error) {
    console.error('Помилка оновлення користувача:', error);
    process.exit(1);
  }
}

// Запускаємо функцію
updateUser();
