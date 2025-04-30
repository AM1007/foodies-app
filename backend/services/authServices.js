import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import models from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/auth.js';
import jwtHelpers from '../helpers/jwt.js';
import { token } from 'morgan';

const { User } = models;

const findUser = async query => await User.findOne({ where: query });

const registerUser = async userData => {
  const { email, password, name } = userData;

  // Перевіряємо чи існує користувач з таким email
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(HTTP_STATUS.CONFLICT, 'Email already in use');
  }

  // Створюємо хеш пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Отримуємо аватар з gravatar
  const avatarURL = gravatar.url(email, { s: '250', d: 'mp' }, true);

  // Створюємо нового користувача
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatarURL,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
  };
};

const signInUser = async userData => {
  const { email, password } = userData;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = { email };

  const token = jwtHelpers.generateToken(payload);
  const refreshToken = jwtHelpers.generateToken(payload, '7d');
  await user.update({ token, refreshToken });
  return {
    token,
    refreshToken,
    user: { id: user.id, email: user.email },
  };
};

const refreshUserToken = async refreshToken => {
  if (!refreshToken) {
    throw HttpError(401, 'Not authorized');
  }
  const { payload, error } = jwtHelpers.verifyToken(refreshToken);

  if (error) {
    throw HttpError(403, 'Invalid if expired refresh token');
  }

  const user = await findUser({ email: payload.email });
  if (!user || user.refreshToken !== refreshToken) {
    throw HttpError(403, 'Refresh token mismatch');
  }
  const newAccessToken = jwtHelpers.generateToken({ email: user.email });
  return { token: newAccessToken };
};

const invalidateUserToken = async userId => {
  const user = await findUser({ id: userId });
  if (!user || !user.token) {
    throw HttpError(401, 'Not authorized');
  }
  await user.update({ token: null, refreshToken: null });
  return user;
};

export default {
  findUser,
  registerUser,
  signInUser,
  invalidateUserToken,
  refreshUserToken,
};
