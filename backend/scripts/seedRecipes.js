import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Recipe from '../db/models/Recipe.js';
import Category from '../db/models/Category.js';
import Area from '../db/models/Area.js';
import Ingredient from '../db/models/Ingredient.js';
import RecipeIngredient from '../db/models/RecipeIngredient.js';
import User from '../db/models/User.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const recipeIdMap = {};

async function migrateRecipes() {
  try {
    await connectToDatabase();

    await RecipeIngredient.destroy({ where: {}, force: true });
    await Recipe.destroy({ where: {}, force: true });

    await sequelize.query('ALTER SEQUENCE "Recipes_id_seq" RESTART WITH 1');

    try {
      await sequelize.query(
        'ALTER SEQUENCE "RecipeIngredients_id_seq" RESTART WITH 1',
      );
    } catch (error) {
      console.warn(
        'Warning: Unable to reset RecipeIngredient sequence:',
        error.message,
      );
      console.warn('Continuing with migration...');
    }

    const ingredientsData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'ingredients.json'),
      'utf8',
    );
    const ingredientsJson = JSON.parse(ingredientsData);

    const recipesData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'recipes.json'),
      'utf8',
    );
    const recipesJson = JSON.parse(recipesData);

    const categories = await Category.findAll();
    const areas = await Area.findAll();
    const users = await User.findAll();
    const ingredients = await Ingredient.findAll();

    console.log(
      `Found ${categories.length} categories, ${areas.length} areas, ${users.length} users, ${ingredients.length} ingredients`,
    );

    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    const areaMap = {};
    areas.forEach(area => {
      areaMap[area.name] = area.id;
    });

    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user.id;
    });

    const mongoIdToName = {};
    ingredientsJson.forEach(ing => {
      if (ing._id) {
        mongoIdToName[ing._id] = ing.name;
      }
    });

    const ingredientMap = {};
    ingredients.forEach(ing => {
      ingredientMap[ing.name] = ing.id;
    });

    console.log(
      `Created mapping for ${
        Object.keys(ingredientMap).length
      } ingredients by name`,
    );
    console.log(
      `Created mapping for ${
        Object.keys(mongoIdToName).length
      } ingredients by MongoDB ID`,
    );

    const ownerIdMap = {};
    recipesJson.forEach(recipe => {
      if (recipe.owner && recipe.owner.$oid) {
        const mongoOwnerId = recipe.owner.$oid;

        if (!ownerIdMap[mongoOwnerId]) {
          const matchingUser =
            users.find(user => user.id === mongoOwnerId) || users[0];
          ownerIdMap[mongoOwnerId] = matchingUser.id;
        }
      }
    });

    console.log('Starting recipe migration...');
    let successCount = 0;
    let totalIngredientsAdded = 0;

    for (const recipe of recipesJson) {
      try {
        const categoryId = categoryMap[recipe.category];
        const areaId = areaMap[recipe.area];
        const ownerId =
          recipe.owner && recipe.owner.$oid
            ? ownerIdMap[recipe.owner.$oid]
            : users[0].id;

        if (!categoryId) {
          console.warn(
            `Category not found for recipe "${recipe.title}": ${recipe.category}`,
          );
          continue;
        }

        if (!areaId) {
          console.warn(
            `Area not found for recipe "${recipe.title}": ${recipe.area}`,
          );
          continue;
        }

        console.log('Creating recipe:', {
          title: recipe.title,
          categoryId,
          areaId,
          ownerId,
        });

        const createdRecipe = await Recipe.create({
          title: recipe.title,
          description: recipe.description || null,
          instructions: recipe.instructions,
          time: recipe.time || 0,
          thumb: recipe.thumb || null,
          categoryId,
          areaId,
          owner: ownerId,
        });

        if (recipe._id && recipe._id.$oid) {
          recipeIdMap[recipe._id.$oid] = createdRecipe.id;
        }

        console.log(
          `Recipe created: ${recipe.title} (ID: ${createdRecipe.id})`,
        );
        successCount++;

        if (recipe.ingredients && recipe.ingredients.length > 0) {
          let ingredientCount = 0;

          for (const ingredientData of recipe.ingredients) {
            if (!ingredientData.id) {
              console.warn(`Missing ingredient id for recipe ${recipe.title}`);
              continue;
            }

            const ingredientName = mongoIdToName[ingredientData.id];
            if (!ingredientName) {
              console.warn(
                `Ingredient name not found for MongoDB ID: ${ingredientData.id} in recipe ${recipe.title}`,
              );
              continue;
            }

            const ingredientId = ingredientMap[ingredientName];
            if (!ingredientId) {
              console.warn(
                `SQL ID not found for ingredient: ${ingredientName} (MongoDB ID: ${ingredientData.id}) in recipe ${recipe.title}`,
              );
              continue;
            }

            await RecipeIngredient.create({
              recipeId: createdRecipe.id,
              ingredientId: ingredientId,
              measure: ingredientData.measure || '',
            });

            ingredientCount++;
          }

          console.log(
            `Added ${ingredientCount} ingredients to recipe ${recipe.title}`,
          );
          totalIngredientsAdded += ingredientCount;
        }
      } catch (error) {
        console.error(
          `Error processing recipe "${recipe.title}":`,
          error.message,
        );
      }
    }

    console.log('Recipes migration completed successfully!');
    console.log(
      `Total recipes migrated: ${successCount} out of ${recipesJson.length}`,
    );
    console.log(`Total ingredients added: ${totalIngredientsAdded}`);

    return recipeIdMap;
  } catch (error) {
    console.error('Error during recipes migration:', error);
    throw error;
  }
}

migrateRecipes()
  .then(() => {
    console.log('Recipe migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Recipe migration failed:', error);
    process.exit(1);
  });
