import express from 'express';
import usersControllers from '../controllers/usersControllers.js';
import upload from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';
import validateNumericId from '../middlewares/validateNumericId.js';

const userRouter = express.Router();

userRouter.get('/', usersControllers.getAllUsersController);

userRouter.get(
  '/current',
  authenticate,
  usersControllers.getUserInfoController,
);

userRouter.get(
  '/following',
  authenticate,
  usersControllers.getFollowingUsersController,
);

userRouter.get(
  '/:id/followers',
  authenticate,
  validateNumericId,
  usersControllers.getFollowersController,
);

userRouter.get(
  '/:id',
  authenticate,
  validateNumericId,
  usersControllers.getUserDetailedInfoController,
);

userRouter.patch(
  '/avatar',
  authenticate,
  upload,
  usersControllers.updateAvatarController,
);

userRouter.post(
  '/:id/follow',
  authenticate,
  validateNumericId,
  usersControllers.followUserController,
);

userRouter.post(
  '/:id/unfollow',
  authenticate,
  validateNumericId,
  usersControllers.unfollowUserController,
);

export default userRouter;
