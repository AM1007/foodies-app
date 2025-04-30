import usersServices from '../services/usersServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/auth.js';

const getUserInfo = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({ user: req.user });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: 'Please attach the file' });
  }
  const { email } = req.user;
  const avatarUrl = req.file?.path;

  if (!avatarUrl) {
    throw HttpError(HTTP_STATUS.BAD_REQUEST, 'Image upload failed');
  }
  await usersServices.updateUserAvatar(email, avatarUrl);
  res.json({ avatar: avatarUrl, message: 'Avatar was successfully updated' });
};

export default {
  updateAvatar: ctrlWrapper(updateAvatar),
  getUserInfo: ctrlWrapper(getUserInfo),
};
