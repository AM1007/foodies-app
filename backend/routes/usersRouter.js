import express from 'express';
import usersControllers from '../controllers/usersControllers.js';
import upload from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.get('/current', authenticate, usersControllers.getUserInfo);

userRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  usersControllers.updateAvatar,
);

export default userRouter;
