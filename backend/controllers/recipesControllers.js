import recipesServices from '../services/recipesServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
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

const addToFavorites = async (req, res) => {
  const { id: userId } = req.user;
  const { id: recipeId } = req.params;
  const result = await recipesServices.addRecipeToFavorites(userId, recipeId);
  res.status(HTTP_STATUS.CREATED).json(result);
};

const removeFromFavorites = async (req, res) => {
  const { id: userId } = req.user;
  const { id: recipeId } = req.params;
  const result = await recipesServices.removeRecipeFromFavorites(userId, recipeId);
  res.status(HTTP_STATUS.OK).json(result);
};

const getFavoriteRecipes = async (req, res) => {
  const { id: userId } = req.user;
  const favorites = await recipesServices.getFavoriteRecipes(userId, req.query);
  res.status(HTTP_STATUS.OK).json(favorites);
};

export default {
   searchRecipes: ctrlWrapper(searchRecipes),
   getRecipeById: ctrlWrapper(getRecipeById),
   addToFavorites: ctrlWrapper(addToFavorites),
   removeFromFavorites: ctrlWrapper(removeFromFavorites),
   getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
};
