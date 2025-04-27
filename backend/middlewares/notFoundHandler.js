//this_is_a_temporary_comment
const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export default notFoundHandler;
