import { Op } from 'sequelize';
import models from '../db/associations.js';
import paginationHelper from '../helpers/paginationHelper.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const { Recipe, Category, Area, User, Ingredient, Favorite, sequelize,  } = models;

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
const getRecipeById = async (recipeId) => {
  try {
    const recipe = await Recipe.findByPk(Number(recipeId), {
      include: [
        { model: Category, as: 'category' },
        { model: Area, as: 'area' },
        { 
          model: User, 
          as: 'user', 
          attributes: ['id', 'name', 'email', 'avatar'] 
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
    throw HttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to retrieve recipe');
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

export default {
   getRecipeById,
   getAllRecipes,
   addRecipeToFavorites,
   removeRecipeFromFavorites,
   getFavoriteRecipes,
};