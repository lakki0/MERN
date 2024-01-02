const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  if (err.name == "JsonWebTokenError") {
    const msg = "Json web token is invalid, Try again";
    err = new ErrorHandler(msg, 400);
  }

  if (err.name == "TokenExpiredError") {
    const msg = "Json web token is expired, Try again";
    err = new ErrorHandler(msg, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
