import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const validateBody = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(HttpError(HTTP_STATUS.BAD_REQUEST, error.message));
    }
    next();
  };
};

export default validateBody;
