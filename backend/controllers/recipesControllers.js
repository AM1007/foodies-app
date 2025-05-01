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
  const result = await recipesServices.removeRecipeFromFavorites(
    userId,
    recipeId,
  );
  res.status(HTTP_STATUS.OK).json(result);
};

const getFavoriteRecipes = async (req, res) => {
  const { id: userId } = req.user;
  const favorites = await recipesServices.getFavoriteRecipes(userId, req.query);
  res.status(HTTP_STATUS.OK).json(favorites);
};

/**
 * Controller for getting popular recipes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPopularRecipes = async (req, res) => {
  const popularRecipes = await recipesServices.getPopularRecipes(req.query);
  res.status(HTTP_STATUS.OK).json(popularRecipes);
};

/**
 * Controller for creating a new recipe
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createRecipe = async (req, res) => {
  const { id: userId } = req.user;
  const recipeData = req.body;

  // Parse ingredients if they were sent as JSON string
  if (typeof recipeData.ingredients === 'string') {
    try {
      recipeData.ingredients = JSON.parse(recipeData.ingredients);
    } catch (e) {
      throw HttpError(HTTP_STATUS.BAD_REQUEST, 'Invalid ingredients format');
    }
  }

  const newRecipe = await recipesServices.createRecipe(
    recipeData,
    userId,
    req.files || {},
  );
  res.status(HTTP_STATUS.CREATED).json(newRecipe);
};

/**
 * Controller for deleting a recipe
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { id: userId } = req.user;

  const result = await recipesServices.deleteRecipe(recipeId, userId);
  res.status(HTTP_STATUS.OK).json(result);
};

/**
 * Controller for getting user's own recipes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserRecipes = async (req, res) => {
  const { id: userId } = req.user;
  const userRecipes = await recipesServices.getUserRecipes(userId, req.query);
  res.status(HTTP_STATUS.OK).json(userRecipes);
};

export default {
  searchRecipes: ctrlWrapper(searchRecipes),
  getRecipeById: ctrlWrapper(getRecipeById),
  addToFavorites: ctrlWrapper(addToFavorites),
  removeFromFavorites: ctrlWrapper(removeFromFavorites),
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  createRecipe: ctrlWrapper(createRecipe),
  deleteRecipe: ctrlWrapper(deleteRecipe),
  getUserRecipes: ctrlWrapper(getUserRecipes),
};
