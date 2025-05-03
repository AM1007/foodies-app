import cors from 'cors';
import express from 'express';
import authControllers from '../controllers/authControllers.js';
import validateBody from '../decorators/validateBody.js';
import authSchemas from '../schemas/authSchemas.js';

import authenticate from '../middlewares/authenticate.js';

const corsOptions = {
  origin: ['https://foodies-app-pke3.onrender.com', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

const router = express.Router();

router.options('*', cors(corsOptions));

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
