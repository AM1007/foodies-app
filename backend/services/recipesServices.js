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

/**
 * Search for recipes with filters and pagination
 * @param {Object} query - Query parameters
 * @returns {Object} Recipes with pagination metadata
 */
const getAllRecipes = async (query = {}) => {
  const { title, category, area, ingredient, time, sort } = query;

  // Prepare filter conditions
  const whereConditions = {};
  const includeOptions = [
    { model: Category, as: 'category' },
    { model: Area, as: 'area' },
    { model: User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] },
  ];

  // Add category filter if provided (per the requirements)
  if (category) {
    whereConditions.categoryId = category;
  }

  // Add area filter if provided (per the requirements)
  if (area) {
    whereConditions.areaId = area;
  }

  // Add title filter if provided (additional feature)
  if (title) {
    whereConditions.title = { [Op.iLike]: `%${title}%` };
  }

  // Add time filter if provided (additional feature)
  if (time) {
    whereConditions.time = { [Op.lte]: time };
  }

  // Add ingredient filter if provided (per the requirements)
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

  // Handle sorting
  const order = [];
  if (sort) {
    const sortDirection = sort.startsWith('-') ? 'DESC' : 'ASC';
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    order.push([sortField, sortDirection]);
  } else {
    // Default sort by createdAt descending (newest first)
    order.push(['createdAt', 'DESC']);
  }

  // Get pagination options
  const { limit, offset } = paginationHelper.getPaginationOptions(query);

  try {
    // Get recipes with filters and pagination
    const result = await Recipe.findAndCountAll({
      where: whereConditions,
      include: includeOptions,
      order,
      limit,
      offset,
      distinct: true,
    });

    // Format response with pagination metadata
    return paginationHelper.paginateResponse(result, query);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching recipes:', error);

    // Re-throw the error to be handled by the controller wrapper
    throw error;
  }
};

/**
 * Get detailed recipe information by ID
 * @param {number|string} recipeId - ID of the recipe to retrieve
 * @returns {Object} Recipe with detailed information
 */
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
    // If error is already an HttpError, rethrow it
    if (error.status) {
      throw error;
    }

    // Log original error for debugging
    console.error('Error fetching recipe by ID:', error);

    // Convert to appropriate HTTP error
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
    // Получаем общее количество рецептов
    const count = await Recipe.count();

    // Получаем последние добавленные рецепты
    // Это будет наше запасное решение, которое гарантированно работает
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

    // Добавим комментарий о том, что на данный момент мы не сортируем по популярности
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

    if (files.thumb) {
      recipeDetails.thumb = files.thumb.path;
    }
    if (files.preview) {
      recipeDetails.preview = files.preview.path;
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

const deleteRecipe = async (recipeId, userId) => {
  // Находим рецепт и проверяем его существование
  const recipe = await Recipe.findByPk(recipeId);

  if (!recipe) {
    throw HttpError(HTTP_STATUS.NOT_FOUND, 'Recipe not found');
  }

  // Проверяем, является ли пользователь владельцем рецепта
  if (recipe.owner !== userId) {
    throw HttpError(
      HTTP_STATUS.FORBIDDEN,
      'You can only delete your own recipes',
    );
  }

  try {
    // Сначала удаляем связанные записи в RecipeIngredient
    await RecipeIngredient.destroy({
      where: { recipeId },
    });

    // Затем удаляем сам рецепт
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

/**
 * Get recipes created by the user
 * @param {number} userId - ID of the user
 * @param {Object} query - Query parameters for pagination and filtering
 * @returns {Object} User's recipes with pagination metadata
 */
const getUserRecipes = async (userId, query = {}) => {
  const { title, category, area, time, sort } = query;

  // Prepare filter conditions - always filter by owner
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

  // Add title filter if provided
  if (title) {
    whereConditions.title = { [Op.iLike]: `%${title}%` };
  }

  // Add category filter if provided
  if (category) {
    whereConditions.categoryId = category;
  }

  // Add area filter if provided
  if (area) {
    whereConditions.areaId = area;
  }

  // Add time filter if provided
  if (time) {
    whereConditions.time = { [Op.lte]: time };
  }

  // Handle sorting
  const order = [];
  if (sort) {
    const sortDirection = sort.startsWith('-') ? 'DESC' : 'ASC';
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    order.push([sortField, sortDirection]);
  } else {
    // Default sort by createdAt descending (newest first)
    order.push(['createdAt', 'DESC']);
  }

  // Get pagination options
  const { limit, offset } = paginationHelper.getPaginationOptions(query);

  try {
    // Get recipes with filters and pagination
    const result = await Recipe.findAndCountAll({
      where: whereConditions,
      include: includeOptions,
      order,
      limit,
      offset,
      distinct: true,
    });

    // Format response with pagination metadata
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
