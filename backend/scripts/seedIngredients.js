import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ingredient from '../db/models/Ingredient.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Мапінг для збереження відповідності між MongoDB ID і SQL ID
const ingredientIdMap = {};

async function migrateIngredients() {
  try {
    // Підключення до бази даних
    await connectToDatabase();

    // Очищення таблиці й скидання автоінкременту
    await Ingredient.destroy({ where: {}, force: true });

    // Скидання послідовності (для PostgreSQL)
    await sequelize.query('ALTER SEQUENCE "Ingredients_id_seq" RESTART WITH 1');

    // Зчитування файлу ingredients.json
    const ingredientsData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'ingredients.json'),
      'utf8',
    );
    const ingredientsJson = JSON.parse(ingredientsData);

    // Підготовка даних для вставки
    const ingredientsToInsert = ingredientsJson.map(ingredient => ({
      name: ingredient.name,
      desc: ingredient.desc,
      img: ingredient.img,
    }));

    // Вставка даних і отримання результатів
    const createdIngredients = await Ingredient.bulkCreate(
      ingredientsToInsert,
      {
        returning: true,
      },
    );

    // Створення мапінгу MongoDB ID -> SQL ID
    createdIngredients.forEach((createdIngredient, index) => {
      const mongoId = ingredientsJson[index]._id;
      ingredientIdMap[mongoId] = createdIngredient.id;
      console.log(`Ingredient mapped: ${mongoId} -> ${createdIngredient.id}`);
    });

    console.log('Ingredients migration completed successfully!');
    console.log('Ingredient ID mapping:', ingredientIdMap);

    return ingredientIdMap;
  } catch (error) {
    console.error('Error during ingredients migration:', error);
    throw error;
  }
}

// Викликаємо функцію міграції
migrateIngredients()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
