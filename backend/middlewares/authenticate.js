import HttpError from '../helpers/HttpError.js';
import authServices from '../services/authServices.js';
import jwtHelper from '../helpers/jwt.js';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'No authorization token'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer token not found'));
  }
  const { payload, error } = jwtHelper.verifyToken(token);

  if (error) {
    return next(HttpError(401, error.message));
  }

  const user = await authServices.findUser({ email: payload.email });
  if (!user || !user.token) {
    return next(HttpError(401, 'Not authorized'));
  }
  req.user = user;
  next();
};

export default authenticate;
