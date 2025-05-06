import { HTTP_STATUS } from '../constants/httpStatus.js';
import HttpError from '../helpers/HttpError.js';

const validateNumericId = (req, res, next) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (!Number(numericId) || isNaN(numericId) || numericId <= 0) {
    return next(HttpError(HTTP_STATUS.BAD_REQUEST, 'Invalid user id'));
  }
  next();
};

export default validateNumericId;
