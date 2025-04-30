import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import authenticate from '../middlewares/authenticate.js';
import validateQuery from '../decorators/validateQuery.js';
import recipeSchemas from '../schemas/recipeSchemas.js';

const router = express.Router();

/**
 * @route GET /api/recipes
 * @desc Search recipes with filters and pagination
 * @access Public
 */
router.get('/', recipesControllers.searchRecipes);
router.get('/', validateQuery(recipeSchemas.recipeQuerySchema), recipesControllers.searchRecipes);
/**
 * @route GET /api/recipes/:id
 * @desc Get detailed recipe information by ID
 * @access Public
 */
router.get('/:id', recipesControllers.getRecipeById);

router.post('/:id/favorite', authenticate, recipesControllers.addToFavorites);
router.delete('/:id/favorite', authenticate, recipesControllers.removeFromFavorites);
router.get(
  '/favorites',
  authenticate,
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getFavoriteRecipes
);

export default router;