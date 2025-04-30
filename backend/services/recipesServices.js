import { Op } from 'sequelize';
import models from '../db/associations.js';
import paginationHelper from '../helpers/paginationHelper.js';

const { Recipe, Category, Area, User, Ingredient, sequelize } = models;

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

export default {
  getAllRecipes,
};