import cors from 'cors';
import express from 'express';
import authControllers from '../controllers/authControllers.js';
import validateBody from '../decorators/validateBody.js';
import authSchemas from '../schemas/authSchemas.js';

import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(authSchemas.registerSchema),
  authControllers.signUpController,
);

router.post(
  '/login',
  validateBody(authSchemas.signInSchema),
  authControllers.singInController,
);

router.post('/refresh', authControllers.refreshTokenController);

router.post('/logout', authenticate, authControllers.logOutController);

export default router;
