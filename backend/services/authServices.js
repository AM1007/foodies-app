import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import models from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import jwtHelpers from '../helpers/jwt.js';
import { userNameRegexp } from '../constants/auth.js';
const { User } = models;

const findUser = async query => await User.findOne({ where: query });

const validateUserName = userName => {
  if (!userName) {
    return { vaild: false, message: 'Username is required' };
  }
  if (userName.length < 3 || userName.length > 30) {
    return {
      valid: false,
      message: 'Name must be between 3 and 30 characters',
    };
  }
  if (!userNameRegexp.test(userName)) {
    return {
      valid: false,
      message:
        'Name should only contain letters, numbers, underscores, hyphens, dots and commas',
    };
  }
  return { valid: true };
};

const registerUser = async userData => {
  const { email, password, name } = userData;

  const sanitizedName = name.trim();

  const validatedName = validateUserName(sanitizedName);

  if (!validatedName.valid) {
    throw HttpError(HTTP_STATUS.BAD_REQUEST, validatedName.message);
  }

  const existingUser = await findUser({ email });

  if (existingUser) {
    throw HttpError(HTTP_STATUS.CONFLICT, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: '250', d: 'mp' }, true);

  const newUser = await User.create({
    name: sanitizedName,
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

  const userResponse = {
    id: user.id,
    email: user.email,
  };

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw HttpError(HTTP_STATUS.UNAUTHORIZED, 'Email or password is wrong');
  }

  if (user.token) {
    const { error } = jwtHelpers.verifyToken(user.token);
    if (!error) {
      return {
        token: user.token,
        refreshToken: user.refreshToken,
        user: userResponse,
      };
    }
  }

  const payload = { email };
  const token = jwtHelpers.generateToken(payload);
  const refreshToken = jwtHelpers.generateToken(payload, '7d');
  await user.update({ token, refreshToken });

  return { token, refreshToken, user: userResponse };
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
