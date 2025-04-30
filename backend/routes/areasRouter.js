import express from 'express';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { getAreas } from '../controllers/areasControllers.js';

const areasRouter = express.Router();

areasRouter.get('/', ctrlWrapper(getAreas));

export default areasRouter;
