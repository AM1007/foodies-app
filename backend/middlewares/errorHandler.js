//this_is_a_temporary_comment
const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;

  // Логуємо помилку в консоль
  console.error(
    `${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  res.status(status).json({
    message,
  });
};

export default errorHandler;
