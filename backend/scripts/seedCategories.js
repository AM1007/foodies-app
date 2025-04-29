import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from '../db/models/Category.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Мапінг для збереження відповідності між MongoDB ID і SQL ID
const categoryIdMap = {};

async function migrateCategories() {
  try {
    // Підключення до бази даних
    await connectToDatabase();

    // Очищення таблиці й скидання автоінкременту
    await Category.destroy({ where: {}, force: true });

    // Скидання послідовності (для PostgreSQL)
    await sequelize.query('ALTER SEQUENCE "Categories_id_seq" RESTART WITH 1');

    // Зчитування файлу categories.json
    const categoriesData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'categories.json'),
      'utf8',
    );
    const categoriesJson = JSON.parse(categoriesData);

    // Підготовка даних для вставки
    const categoriesToInsert = categoriesJson.map(category => ({
      name: category.name,
    }));

    // Вставка даних і отримання результатів
    const createdCategories = await Category.bulkCreate(categoriesToInsert, {
      returning: true,
    });

    // Створення мапінгу MongoDB ID -> SQL ID
    createdCategories.forEach((createdCategory, index) => {
      const mongoId = categoriesJson[index]._id.$oid;
      categoryIdMap[mongoId] = createdCategory.id;
      console.log(`Category mapped: ${mongoId} -> ${createdCategory.id}`);
    });

    console.log('Categories migration completed successfully!');
    console.log('Category ID mapping:', categoryIdMap);

    return categoryIdMap;
  } catch (error) {
    console.error('Error during categories migration:', error);
    throw error;
  }
}

// Викликаємо функцію міграції
migrateCategories()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
