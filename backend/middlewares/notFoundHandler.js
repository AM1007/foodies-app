const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export default notFoundHandler;
