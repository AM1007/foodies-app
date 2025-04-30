import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';

const router = express.Router();

/**
 * @route GET /api/recipes
 * @desc Search recipes with filters and pagination
 * @access Public
 */
router.get('/', recipesControllers.searchRecipes);

export default router;