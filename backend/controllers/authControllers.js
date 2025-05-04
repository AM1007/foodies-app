import authServices from '../services/authServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

const signUpController = async (req, res) => {
  const user = await authServices.registerUser(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    message: 'Registration successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    token: user.token,
    refreshToken: user.refreshToken,
  });
};

const singInController = async (req, res) => {
  const { email, password } = req.body;
  const token = await authServices.signInUser({ email, password });
  res.status(HTTP_STATUS.OK).json(token);
};

const logOutController = async (req, res) => {
  const { id } = req.user;
  await authServices.invalidateUserToken(id);
  res.status(HTTP_STATUS.NO_CONTENT).json();
};

const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authServices.refreshUserToken(refreshToken);
  res.status(HTTP_STATUS.OK).json(result);
};

export default {
  signUpController: ctrlWrapper(signUpController),
  singInController: ctrlWrapper(singInController),
  logOutController: ctrlWrapper(logOutController),
  refreshTokenController: ctrlWrapper(refreshTokenController),
};
