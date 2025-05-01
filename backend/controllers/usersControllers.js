import usersServices from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const getUserInfoController = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({ user: req.user });
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

  await usersServices.followUser(currentUserId, targetUserId);
  res.status(200).json({ message: 'Followed user successfully' });
};

const unfollowUserController = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { id: targetUserId } = req.params;

  await usersServices.unfollowUser(currentUserId, targetUserId);
  res.status(200).json({ message: 'Unfollowed user successfully' });
};

const getFollowedUsersController = async (req, res) => {
  const { id: followerId } = req.user;
  const response = await usersServices.getFollowedUsers(followerId);
  res.status(200).json({ response });
};

const getFollowingUsersController = async (req, res) => {
  const { id: userId } = req.user;
  const response = await usersServices.getFollowingUsers(userId);
  res.status(200).json({ response });
};

export default {
  updateAvatarController: ctrlWrapper(updateAvatarController),
  getAllUsersController: ctrlWrapper(getAllUsersController),
  getUserInfoController: ctrlWrapper(getUserInfoController),
  followUserController: ctrlWrapper(followUserController),
  unfollowUserController: ctrlWrapper(unfollowUserController),
  getFollowedUsersController: ctrlWrapper(getFollowedUsersController),
  getFollowingUsersController: ctrlWrapper(getFollowingUsersController),
};
