import * as authServices from '../services/authServices.js';
import { HTTP_STATUS } from '../constants/auth.js';
// import ctrlWrapper from '../decorators/ctrlWrapper.js';

const register = async (req, res) => {
  const user = await authServices.register(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    message: 'Registration successful',
    user,
  });
};

export default {
  register: ctrlWrapper(register),
};
