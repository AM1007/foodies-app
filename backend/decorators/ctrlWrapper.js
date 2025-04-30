const ctrlWrapper = handler => {
  const func = async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        error.status = 400;
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        error.status = 409;
      }
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
