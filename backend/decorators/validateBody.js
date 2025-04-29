import HttpError from '../utils/HttpError.js';

const validateBody = schema => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
};

export default validateBody;
