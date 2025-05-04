import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ingredient from '../db/models/Ingredient.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ingredientIdMap = {};

async function migrateIngredients() {
  try {
    await connectToDatabase();

    await Ingredient.destroy({ where: {}, force: true });

    await sequelize.query('ALTER SEQUENCE "Ingredients_id_seq" RESTART WITH 1');

    const ingredientsData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'ingredients.json'),
      'utf8',
    );
    const ingredientsJson = JSON.parse(ingredientsData);

    const ingredientsToInsert = ingredientsJson.map(ingredient => ({
      name: ingredient.name,
      desc: ingredient.desc,
      img: ingredient.img,
    }));

    const createdIngredients = await Ingredient.bulkCreate(
      ingredientsToInsert,
      {
        returning: true,
      },
    );

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

migrateIngredients()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
