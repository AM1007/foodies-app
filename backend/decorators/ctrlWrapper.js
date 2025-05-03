import { HTTP_STATUS } from '../constants/httpStatus.js';

const ctrlWrapper = handler => {
  const func = async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        error.status = HTTP_STATUS.BAD_REQUEST;
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        error.status = HTTP_STATUS.CONFLICT;
      }
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
