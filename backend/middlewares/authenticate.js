import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import authServices from '../services/authServices.js';
import jwtHelper from '../helpers/jwt.js';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(HTTP_STATUS.UNAUTHORIZED, 'No authorization token'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(HTTP_STATUS.UNAUTHORIZED, 'Bearer token not found'));
  }
  const { payload, error } = jwtHelper.verifyToken(token);

  if (error) {
    return next(HttpError(HTTP_STATUS.UNAUTHORIZED, error.message));
  }

  const user = await authServices.findUser({ email: payload.email });
  if (!user || !user.token) {
    return next(HttpError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized'));
  }
  req.user = user;
  next();
};

export default authenticate;
