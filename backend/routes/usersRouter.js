import express from 'express';
import usersControllers from '../controllers/usersControllers.js';
import upload from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.get('/', usersControllers.getAllUsersController);

userRouter.get(
  '/current',
  authenticate,
  usersControllers.getUserInfoController,
);

userRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  usersControllers.updateAvatarController,
);

userRouter.post(
  '/:id/follow',
  authenticate,
  usersControllers.followUserController,
);

userRouter.post(
  '/:id/unfollow',
  authenticate,
  usersControllers.unfollowUserController,
);

userRouter.get(
  '/followed-users',
  authenticate,
  usersControllers.getFollowedUsersController,
);

userRouter.get(
  '/following-users',
  authenticate,
  usersControllers.getFollowingUsersController,
);

export default userRouter;
