import express from 'express';
import authControllers from '../controllers/authControllers.js';
// import validateBody from '../decorators/validateBody.js';
import { registerSchema } from '../schemas/authSchemas.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  authControllers.register,
);

export default router;
