import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from '../db/models/Category.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoryIdMap = {};

async function migrateCategories() {
  try {
    await connectToDatabase();

    await Category.destroy({ where: {}, force: true });

    await sequelize.query('ALTER SEQUENCE "Categories_id_seq" RESTART WITH 1');

    const categoriesData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'categories.json'),
      'utf8',
    );
    const categoriesJson = JSON.parse(categoriesData);

    const categoriesToInsert = categoriesJson.map(category => ({
      name: category.name,
    }));

    const createdCategories = await Category.bulkCreate(categoriesToInsert, {
      returning: true,
    });

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

migrateCategories()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
