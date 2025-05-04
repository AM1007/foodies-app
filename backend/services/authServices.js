import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import models from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import jwtHelpers from '../helpers/jwt.js';
import { token } from 'morgan';

const { User } = models;

const findUser = async query => await User.findOne({ where: query });

const registerUser = async userData => {
  const { email, password, name } = userData;

  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(HTTP_STATUS.CONFLICT, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: '250', d: 'mp' }, true);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatarURL,
  });

  const payload = { email };
  const token = jwtHelpers.generateToken(payload);
  const refreshToken = jwtHelpers.generateToken(payload, '7d');

  await newUser.update({ token, refreshToken });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
    token,
    refreshToken,
  };
};

const signInUser = async userData => {
  const { email, password } = userData;
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(HTTP_STATUS.UNAUTHORIZED, 'Email or password is wrong');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw HttpError(HTTP_STATUS.UNAUTHORIZED, 'Email or password is wrong');
  }

  if (user.token) {
    const { error } = jwtHelpers.verifyToken(user.token);
    if (!error) {
      throw HttpError(HTTP_STATUS.CONFLICT, 'User already logged in');
    }
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
    throw HttpError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized');
  }
  const { payload, error } = jwtHelpers.verifyToken(refreshToken);

  if (error) {
    throw HttpError(HTTP_STATUS.FORBIDDEN, 'Invalid if expired refresh token');
  }

  const user = await findUser({ email: payload.email });
  if (!user || user.refreshToken !== refreshToken) {
    throw HttpError(HTTP_STATUS.FORBIDDEN, 'Refresh token mismatch');
  }
  const newAccessToken = jwtHelpers.generateToken({ email: user.email });
  await user.update({ token: newAccessToken });
  return { token: newAccessToken };
};

const invalidateUserToken = async userId => {
  const user = await findUser({ id: userId });
  if (!user || !user.token) {
    throw HttpError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized');
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
