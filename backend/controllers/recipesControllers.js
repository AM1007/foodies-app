import recipesServices from '../services/recipesServices.js';
import { HTTP_STATUS } from '../constants/auth.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

/**
 * Controller for searching recipes with filters and pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchRecipes = async (req, res) => {
  const searchResults = await recipesServices.getAllRecipes(req.query);
  res.status(HTTP_STATUS.OK).json(searchResults);
};

/**
 * Controller for getting detailed recipe information by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getRecipeById(id);
  res.status(HTTP_STATUS.OK).json(recipe);
};

export default {
   searchRecipes: ctrlWrapper(searchRecipes),
   getRecipeById: ctrlWrapper(getRecipeById),
};
