import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import authenticate from '../middlewares/authenticate.js';
import validateQuery from '../decorators/validateQuery.js';
import validateBody from '../decorators/validateBody.js';
import recipeSchemas from '../schemas/recipeSchemas.js';
import { recipeImagesUpload } from '../middlewares/upload.js';

const router = express.Router();

/**
 * @route GET /api/recipes
 * @desc Search recipes with filters and pagination
 * @access Public
 */
router.get(
  '/',
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.searchRecipes,
);
/**
 * @route GET /api/recipes/:id
 * @desc Get detailed recipe information by ID
 * @access Public
 */
router.get('/:id', recipesControllers.getRecipeById);

router.post('/:id/favorite', authenticate, recipesControllers.addToFavorites);
router.delete(
  '/:id/favorite',
  authenticate,
  recipesControllers.removeFromFavorites,
);
router.get(
  '/favorites',
  authenticate,
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getFavoriteRecipes,
);

/**
 * @route GET /api/recipes/popular
 * @desc Get popular recipes based on favorite count
 * @access Public
 */
router.get(
  '/popular',
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getPopularRecipes,
);

/**
 * @route POST /api/recipes
 * @desc Create a new recipe
 * @access Private
 */
router.post(
  '/',
  authenticate,
  recipeImagesUpload,
  validateBody(recipeSchemas.createRecipeSchema),
  recipesControllers.createRecipe,
);

/**
 * @route DELETE /api/recipes/:id
 * @desc Delete a recipe (only for owner)
 * @access Private
 */
router.delete('/:id', authenticate, recipesControllers.deleteRecipe);

/**
 * @route GET /api/recipes/own
 * @desc Get recipes created by the authenticated user
 * @access Private
 */
router.get(
  '/own',
  authenticate,
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getUserRecipes,
);

export default router;
