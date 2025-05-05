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

const createRecipe = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const recipeData = req.body;

    console.log('Ingredients before parsing:', recipeData.ingredients);
    console.log('Type of ingredients:', typeof recipeData.ingredients);

    // Парсимо ingredients, якщо це рядок
    if (typeof recipeData.ingredients === 'string') {
      try {
        recipeData.ingredients = JSON.parse(recipeData.ingredients);
        console.log('Ingredients after parsing:', recipeData.ingredients);
      } catch (e) {
        console.error('Error parsing ingredients:', e.message);
        throw HttpError(
          HTTP_STATUS.BAD_REQUEST,
          'Invalid ingredients format: ' + e.message,
        );
      }
    }

    // Перевіряємо, чи є ingredients масивом після парсингу
    if (!Array.isArray(recipeData.ingredients)) {
      console.error(
        'Ingredients is not an array after parsing:',
        recipeData.ingredients,
      );
      throw HttpError(
        HTTP_STATUS.BAD_REQUEST,
        '"ingredients" must be an array',
      );
    }

    // Тепер валідуємо
    const { error } = recipeSchemas.createRecipeSchema.validate(recipeData);
    if (error) {
      console.error('Validation error:', error.message);
      throw HttpError(HTTP_STATUS.BAD_REQUEST, error.message);
    }

    const newRecipe = await recipesServices.createRecipe(
      recipeData,
      userId,
      req.files || {},
    );

    res.status(HTTP_STATUS.CREATED).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

// const createRecipe = async (req, res) => {
//   try {
//     const { id: userId } = req.user;
//     const recipeData = req.body;

//     console.log('Recipe data received:', recipeData);
//     console.log('Ingredients (raw):', recipeData.ingredients);
//     console.log('Type of ingredients:', typeof recipeData.ingredients);

//     if (typeof recipeData.ingredients === 'string') {
//       console.log('Trying to parse ingredients string');
//       try {
//         recipeData.ingredients = JSON.parse(recipeData.ingredients);
//         console.log('Successfully parsed ingredients:', recipeData.ingredients);
//       } catch (e) {
//         console.error('Error parsing ingredients:', e.message);
//         throw HttpError(
//           HTTP_STATUS.BAD_REQUEST,
//           'Invalid ingredients format: ' + e.message,
//         );
//       }
//     }

//     console.log('Final ingredients data:', recipeData.ingredients);

//     // Перевірка, чи є ingredients масивом після всіх перетворень
//     if (!Array.isArray(recipeData.ingredients)) {
//       console.error(
//         'Ingredients is not an array after processing:',
//         recipeData.ingredients,
//       );
//       throw HttpError(
//         HTTP_STATUS.BAD_REQUEST,
//         '"ingredients" must be an array',
//       );
//     }

//     const newRecipe = await recipesServices.createRecipe(
//       recipeData,
//       userId,
//       req.files || {},
//     );
//     res.status(HTTP_STATUS.CREATED).json(newRecipe);
//   } catch (error) {
//     console.error('Error in createRecipe controller:', error);
//     if (!error.status) {
//       error.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
//     }
//     next(error);
//   }
// };

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
