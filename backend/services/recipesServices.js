import { Op } from 'sequelize';
import models from '../db/associations.js';
import paginationHelper from '../helpers/paginationHelper.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const {
  Recipe,
  Category,
  Area,
  User,
  Ingredient,
  Favorite,
  RecipeIngredient,
  sequelize,
} = models;

const getAllRecipes = async (query = {}) => {
  const { title, category, area, ingredient, time, sort } = query;

  const whereConditions = {};
  const includeOptions = [
    { model: Category, as: 'category' },
    { model: Area, as: 'area' },
    { model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] },
  ];

  if (category) {
    whereConditions.categoryId = category;
  }

  if (area) {
    whereConditions.areaId = area;
  }

  if (title) {
    whereConditions.title = { [Op.iLike]: `%${title}%` };
  }

  if (time) {
    whereConditions.time = { [Op.lte]: time };
  }

  if (ingredient) {
    includeOptions.push({
      model: Ingredient,
      as: 'ingredients',
      where: { id: ingredient },
      through: { attributes: ['measure'] },
    });
  } else {
    includeOptions.push({
      model: Ingredient,
      as: 'ingredients',
      through: { attributes: ['measure'] },
    });
  }

  const order = [];
  if (sort) {
    const sortDirection = sort.startsWith('-') ? 'DESC' : 'ASC';
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    order.push([sortField, sortDirection]);
  } else {
    order.push(['createdAt', 'DESC']);
  }

  const { limit, offset } = paginationHelper.getPaginationOptions(query);

  try {
    const result = await Recipe.findAndCountAll({
      where: whereConditions,
      include: includeOptions,
      order,
      limit,
      offset,
      distinct: true,
    });

    return paginationHelper.paginateResponse(result, query);
  } catch (error) {
    console.error('Error fetching recipes:', error);

    throw error;
  }
};

const getRecipeById = async recipeId => {
  try {
    const recipe = await Recipe.findByPk(Number(recipeId), {
      include: [
        { model: Category, as: 'category' },
        { model: Area, as: 'area' },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar'],
        },
        {
          model: Ingredient,
          as: 'ingredients',
          through: { attributes: ['measure'] },
        },
      ],
    });

    if (!recipe) {
      throw HttpError(HTTP_STATUS.NOT_FOUND, 'Recipe not found');
    }

    return recipe;
  } catch (error) {
    if (error.status) {
      throw error;
    }

    console.error('Error fetching recipe by ID:', error);

    throw HttpError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to retrieve recipe',
    );
  }
};

const addRecipeToFavorites = async (userId, recipeId) => {
  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) throw HttpError(404, 'Recipe not found');

  const [favorite, created] = await Favorite.findOrCreate({
    where: { userId, recipeId },
  });

  if (!created) throw HttpError(409, 'Recipe already in favorites');
  return { message: 'Recipe added to favorites' };
};

const removeRecipeFromFavorites = async (userId, recipeId) => {
  const deleted = await Favorite.destroy({ where: { userId, recipeId } });
  if (!deleted) throw HttpError(404, 'Recipe not found in favorites');
  return { message: 'Recipe removed from favorites' };
};

const getFavoriteRecipes = async (userId, query) => {
  const { limit, offset } = paginationHelper.getPaginationOptions(query);

  const { count, rows } = await Recipe.findAndCountAll({
    include: [
      {
        model: User,
        as: 'favoritedBy',
        where: { id: userId },
        attributes: [],
        through: { attributes: [] },
      },
      { model: Category, as: 'category' },
      { model: Area, as: 'area' },
    ],
    limit,
    offset,
    distinct: true,
  });

  return paginationHelper.paginateResponse({ count, rows }, query);
};

const getPopularRecipes = async (query = {}) => {
  const { limit, offset } = paginationHelper.getPaginationOptions(query);

  try {
    const count = await Recipe.count();

    const recipes = await Recipe.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Area, as: 'area' },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    console.log(
      `Successfully fetched ${recipes.length} recipes for popular recipes endpoint`,
    );

    console.log(
      'Note: Currently returning recent recipes instead of sorting by popularity due to database constraints',
    );

    return paginationHelper.paginateResponse(
      {
        count,
        rows: recipes,
      },
      query,
    );
  } catch (error) {
    console.error('Error fetching popular recipes:', error);
    console.error('Error details:', error.stack);
    throw HttpError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to retrieve recipes',
    );
  }
};

const createRecipe = async (recipeData, userId, files = {}) => {
  try {
    const { ingredients, ...recipeDetails } = recipeData;

    recipeDetails.owner = userId;

    // Постійний код для правильного збереження посилань на зображення
    if (files.thumb && files.thumb[0]) {
      recipeDetails.thumb = files.thumb[0].path;
    }
    if (files.preview && files.preview[0]) {
      recipeDetails.preview = files.preview[0].path;
    }

    const recipe = await Recipe.create(recipeDetails);

    if (ingredients && ingredients.length > 0) {
      const recipeIngredients = ingredients.map(ingredient => ({
        recipeId: recipe.id,
        ingredientId: ingredient.ingredientId,
        measure: ingredient.measure || '',
      }));

      await RecipeIngredient.bulkCreate(recipeIngredients);
    }

    return await getRecipeById(recipe.id);
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// const createRecipe = async (recipeData, userId, files = {}) => {
//   try {
//     const { ingredients, ...recipeDetails } = recipeData;

//     // Логування на початку сервісу
//     console.log('====== SERVICE: CREATE RECIPE START ======');
//     console.log(
//       'Service: Creating recipe with files:',
//       JSON.stringify(files, null, 2),
//     );
//     console.log(
//       'Initial recipeDetails:',
//       JSON.stringify(recipeDetails, null, 2),
//     );

//     recipeDetails.owner = userId;

//     // Логування перед встановленням полів зображень
//     console.log('Before setting image paths:');
//     console.log(
//       'Thumb path from files:',
//       files.thumb ? files.thumb[0].path : 'none',
//     );
//     console.log(
//       'Preview path from files:',
//       files.preview ? files.preview[0].path : 'none',
//     );

//     if (files.thumb) {
//       recipeDetails.thumb = files.thumb[0].path;
//       console.log('Thumb path being set to:', recipeDetails.thumb);
//     }
//     if (files.preview) {
//       recipeDetails.preview = files.preview[0].path;
//       console.log('Preview path being set to:', recipeDetails.preview);
//     }

//     // Логування перед створенням рецепту
//     console.log('Before forced set:', JSON.stringify(recipeDetails, null, 2));
//     // Примусово встановити поля, якщо файли є
//     if (files.thumb && files.thumb[0]) {
//       recipeDetails.thumb = files.thumb[0].path;
//       console.log('Forced thumb set to:', recipeDetails.thumb);
//     }
//     if (files.preview && files.preview[0]) {
//       recipeDetails.preview = files.preview[0].path;
//       console.log('Forced preview set to:', recipeDetails.preview);
//     }
//     console.log('After forced set:', JSON.stringify(recipeDetails, null, 2));
//     console.log(
//       'Final recipe details before creation:',
//       JSON.stringify(recipeDetails, null, 2),
//     );
//     console.log('====== SERVICE: CREATE RECIPE DETAILS END ======');

//     const recipe = await Recipe.create(recipeDetails);

//     // Логування після створення рецепту
//     console.log('====== SERVICE: RECIPE CREATED ======');
//     console.log('Created recipe ID:', recipe.id);
//     console.log('Created recipe thumb:', recipe.thumb);
//     console.log('Created recipe preview:', recipe.preview);
//     console.log('====================================');

//     if (ingredients && ingredients.length > 0) {
//       const recipeIngredients = ingredients.map(ingredient => ({
//         recipeId: recipe.id,
//         ingredientId: ingredient.ingredientId,
//         measure: ingredient.measure || '',
//       }));

//       await RecipeIngredient.bulkCreate(recipeIngredients);
//     }

//     return await getRecipeById(recipe.id);
//   } catch (error) {
//     console.error('====== SERVICE: ERROR CREATING RECIPE ======');
//     console.error('Error type:', error.name);
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);
//     console.error('==========================================');
//     throw error;
//   }
// };

// const createRecipe = async (recipeData, userId, files = {}) => {
//   try {
//     const { ingredients, ...recipeDetails } = recipeData;

//     recipeDetails.owner = userId;

//     if (files.thumb) {
//       recipeDetails.thumb = files.thumb.path;
//     }
//     if (files.preview) {
//       recipeDetails.preview = files.preview.path;
//     }

//     const recipe = await Recipe.create(recipeDetails);

//     if (ingredients && ingredients.length > 0) {
//       const recipeIngredients = ingredients.map(ingredient => ({
//         recipeId: recipe.id,
//         ingredientId: ingredient.ingredientId,
//         measure: ingredient.measure || '',
//       }));

//       await RecipeIngredient.bulkCreate(recipeIngredients);
//     }

//     return await getRecipeById(recipe.id);
//   } catch (error) {
//     console.error('Error creating recipe:', error);
//     throw error;
//   }
// };

const deleteRecipe = async (recipeId, userId) => {
  const recipe = await Recipe.findByPk(recipeId);

  if (!recipe) {
    throw HttpError(HTTP_STATUS.NOT_FOUND, 'Recipe not found');
  }

  if (recipe.owner !== userId) {
    throw HttpError(
      HTTP_STATUS.FORBIDDEN,
      'You can only delete your own recipes',
    );
  }

  try {
    await RecipeIngredient.destroy({
      where: { recipeId },
    });

    await recipe.destroy();

    return { message: 'Recipe deleted successfully' };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw HttpError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to delete recipe',
    );
  }
};

const getUserRecipes = async (userId, query = {}) => {
  const { title, category, area, time, sort } = query;

  const whereConditions = {
    owner: userId,
  };

  const includeOptions = [
    { model: Category, as: 'category' },
    { model: Area, as: 'area' },
    {
      model: Ingredient,
      as: 'ingredients',
      through: { attributes: ['measure'] },
    },
  ];

  if (title) {
    whereConditions.title = { [Op.iLike]: `%${title}%` };
  }

  if (category) {
    whereConditions.categoryId = category;
  }

  if (area) {
    whereConditions.areaId = area;
  }

  if (time) {
    whereConditions.time = { [Op.lte]: time };
  }

  const order = [];
  if (sort) {
    const sortDirection = sort.startsWith('-') ? 'DESC' : 'ASC';
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    order.push([sortField, sortDirection]);
  } else {
    order.push(['createdAt', 'DESC']);
  }

  const { limit, offset } = paginationHelper.getPaginationOptions(query);

  try {
    const result = await Recipe.findAndCountAll({
      where: whereConditions,
      include: includeOptions,
      order,
      limit,
      offset,
      distinct: true,
    });

    return paginationHelper.paginateResponse(result, query);
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
};

export default {
  getRecipeById,
  getAllRecipes,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  getFavoriteRecipes,
  getPopularRecipes,
  createRecipe,
  deleteRecipe,
  getUserRecipes,
};
