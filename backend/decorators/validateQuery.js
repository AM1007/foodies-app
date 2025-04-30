const validateQuery = schema => (req, res, next) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  req.query = value;
  next();
};

export default validateQuery;