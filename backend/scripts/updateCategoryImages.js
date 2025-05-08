import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import Category from '../db/models/Category.js';
import { connectToDatabase } from '../db/sequelize.js';
import dotenv from 'dotenv';
import { Op } from 'sequelize';

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
const uploadToCloudinary = async (filePath, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: 'categories',
      overwrite: true,
    });
    console.log(
      `Успішно завантажено зображення: ${publicId}, URL: ${result.secure_url}`,
    );
    return result.secure_url;
  } catch (error) {
    console.error(`Помилка завантаження ${publicId}:`, error);
    return null;
  }
};

async function updateCategoryImages(
  startId = 1,
  endId = null,
  forceUpdate = false,
) {
  try {
    await connectToDatabase();
    console.log('Підключено до бази даних');

    // Будуємо умову вибору категорій
    const whereCondition = {};

    // Додаємо умову для діапазону ID
    if (startId || endId) {
      whereCondition.id = {};
      if (startId && endId) {
        // Якщо вказано обидва значення, використовуємо BETWEEN
        whereCondition.id = {
          [Op.between]: [startId, endId],
        };
      } else if (startId) {
        // Якщо вказано лише початковий ID
        whereCondition.id = {
          [Op.gte]: startId,
        };
      } else if (endId) {
        // Якщо вказано лише кінцевий ID
        whereCondition.id = {
          [Op.lte]: endId,
        };
      }
    }

    // Якщо не потрібно оновлювати всі, додаємо умову
    if (!forceUpdate) {
      whereCondition.imageUrl = null;
    }

    console.log('Умова запиту:', JSON.stringify(whereCondition));

    // Отримуємо категорії, відсортовані за ID
    const categories = await Category.findAll({
      where: whereCondition,
      order: [['id', 'ASC']],
    });
    console.log(`Знайдено ${categories.length} категорій для оновлення`);

    // Шлях до папки temp, де знаходяться зображення
    const tempDir = path.join(__dirname, '..', 'temp');

    // Перевіряємо наявність директорії
    if (!fs.existsSync(tempDir)) {
      console.error(`Директорія ${tempDir} не існує`);
      process.exit(1);
    }

    // Отримуємо всі файли з папки temp
    const files = fs
      .readdirSync(tempDir)
      .filter(
        file =>
          file.endsWith('.jpg') ||
          file.endsWith('.png') ||
          file.endsWith('.jpeg') ||
          file.endsWith('.webp'),
      );

    console.log(`Знайдено ${files.length} зображень у папці temp`);

    for (const category of categories) {
      // Шукаємо файл, ім'я якого починається з ID категорії
      const matchingFiles = files.filter(file =>
        file.startsWith(`${category.id}_`),
      );

      if (matchingFiles.length === 0) {
        console.warn(
          `Немає зображення для категорії ${category.name} (ID: ${category.id})`,
        );
        continue;
      }

      const imageFile = matchingFiles[0]; // Беремо перший знайдений файл
      const imagePath = path.join(tempDir, imageFile);

      // Завантажуємо до Cloudinary
      const publicId = `category_${category.id}`;
      const imageUrl = await uploadToCloudinary(imagePath, publicId);

      if (imageUrl) {
        // Оновлюємо категорію
        await category.update({ imageUrl });
        console.log(`Категорію ${category.name} оновлено з URL: ${imageUrl}`);
      }
    }

    console.log('Оновлення категорій завершено');
    process.exit(0);
  } catch (error) {
    console.error('Помилка оновлення категорій:', error);
    process.exit(1);
  }
}

// Визначаємо параметри з аргументів командного рядка
const args = process.argv.slice(2);
const startId = args[0] ? parseInt(args[0]) : 1;
const endId = args[1] ? parseInt(args[1]) : null;
const forceUpdate = args[2] === 'force';

// Запускаємо функцію
updateCategoryImages(startId, endId, forceUpdate);

// node scripts/updateCategoryImages.js 1 9 де (1 9 - діапазон. Для перезапису наприкінці додати force)
