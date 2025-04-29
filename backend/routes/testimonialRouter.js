import express from 'express';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { getTestimonials } from '../controllers/testimonialControllers.js';

const testimonialRouter = express.Router();

testimonialRouter.get('/', ctrlWrapper(getTestimonials));

export default testimonialRouter;
