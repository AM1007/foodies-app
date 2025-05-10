import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import authenticate from '../middlewares/authenticate.js';
import validateQuery from '../decorators/validateQuery.js';
import validateBody from '../decorators/validateBody.js';
import validateNumericId from '../middlewares/validateNumericId.js';
import recipeSchemas from '../schemas/recipeSchemas.js';
import { recipeImagesUpload, processRecipeImages } from '../middlewares/upload.js';


const router = express.Router();

router.get(
  '/popular',
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getPopularRecipes,
);

router.get(
  '/own',
  authenticate,
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getUserRecipes,
);

router.get(
  '/favorites',
  authenticate,
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.getFavoriteRecipes,
);

router.get(
  '/',
  validateQuery(recipeSchemas.recipeQuerySchema),
  recipesControllers.searchRecipes,
);

router.get('/:id', validateNumericId, recipesControllers.getRecipeById);

router.post('/:id/favorite', authenticate, recipesControllers.addToFavorites);

router.delete(
  '/:id/favorite',
  authenticate,
  recipesControllers.removeFromFavorites,
);

router.post(
  '/',
  authenticate,
  recipeImagesUpload,
  processRecipeImages,
  recipesControllers.createRecipe,
);

router.delete('/:id', authenticate, recipesControllers.deleteRecipe);

export default router;
