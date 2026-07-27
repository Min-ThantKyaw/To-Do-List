const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Error Log:", err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;
