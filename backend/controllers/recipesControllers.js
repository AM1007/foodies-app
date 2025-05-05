import recipesServices from '../services/recipesServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import recipeSchemas from '../schemas/recipeSchemas.js';
const { createRecipeSchema } = recipeSchemas;

const searchRecipes = async (req, res) => {
  const searchResults = await recipesServices.getAllRecipes(req.query);
  res.status(HTTP_STATUS.OK).json(searchResults);
};

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

const getPopularRecipes = async (req, res) => {
  const popularRecipes = await recipesServices.getPopularRecipes(req.query);
  res.status(HTTP_STATUS.OK).json(popularRecipes);
};

const createRecipe = async (req, res) => {
  const { id: userId } = req.user;
  const recipeData = req.body;

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

const deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { id: userId } = req.user;

  const result = await recipesServices.deleteRecipe(recipeId, userId);
  res.status(HTTP_STATUS.OK).json(result);
};

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
