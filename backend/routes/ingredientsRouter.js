import express from 'express';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { getIngredients } from '../controllers/ingredientsControllers.js';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', ctrlWrapper(getIngredients));

export default ingredientsRouter;
