import express from 'express';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { getCategories } from '../controllers/categoriesControllers.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', ctrlWrapper(getCategories));

export default categoriesRouter;
