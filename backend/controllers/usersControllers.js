import usersServices from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const getUserInfoController = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({ user: req.user });
};

const getUserDetailedInfoController = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { id: targetUserId } = req.params;
  const isSelf = currentUserId === Number(targetUserId);
  const userInfo = await usersServices.getUserDetailedInfo(targetUserId, {
    isSelf,
  });
  res.status(HTTP_STATUS.OK).json(userInfo);
};

const getAllUsersController = async (req, res) => {
  const users = await usersServices.getAllUsers();
  res.status(HTTP_STATUS.OK).json({ users });
};

const updateAvatarController = async (req, res) => {
  if (!req.file) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Please attach the file' });
  }
  const { id } = req.user;
  const avatarUrl = req.file?.path;

  if (!avatarUrl) {
    throw HttpError(HTTP_STATUS.BAD_REQUEST, 'Image upload failed');
  }
  await usersServices.updateUserAvatar(id, avatarUrl);
  res.json({ avatar: avatarUrl, message: 'Avatar was successfully updated' });
};

const followUserController = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { id: targetUserId } = req.params;

  await usersServices.followUser(currentUserId, Number(targetUserId));
  res.status(HTTP_STATUS.OK).json({ message: 'Followed user successfully' });
};

const unfollowUserController = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { id: targetUserId } = req.params;

  await usersServices.unfollowUser(currentUserId, Number(targetUserId));
  res.status(HTTP_STATUS.OK).json({ message: 'Unfollowed user successfully' });
};

const getFollowingUsersController = async (req, res) => {
  const { id } = req.user;
  const response = await usersServices.getUsersIFollow(id);
  res.status(HTTP_STATUS.OK).json({ response });
};

const getFollowersController = async (req, res) => {
  const { id } = req.params;
  const followers = await usersServices.getUsersFollowingMe(Number(id));
  res.status(HTTP_STATUS.OK).json({ followers });
};

export default {
  updateAvatarController: ctrlWrapper(updateAvatarController),
  getAllUsersController: ctrlWrapper(getAllUsersController),
  getUserInfoController: ctrlWrapper(getUserInfoController),
  followUserController: ctrlWrapper(followUserController),
  unfollowUserController: ctrlWrapper(unfollowUserController),
  getFollowersController: ctrlWrapper(getFollowersController),
  getFollowingUsersController: ctrlWrapper(getFollowingUsersController),
  getUserDetailedInfoController: ctrlWrapper(getUserDetailedInfoController),
};
