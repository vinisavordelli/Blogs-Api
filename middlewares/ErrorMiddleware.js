const StatusCodes = require('http-status-codes');

module.exports = (err, _req, res, next) => {
  if (err.isJoi) {
    const statusCode = err.details[0].type;
    const result = (statusCode === 'any.required') ? StatusCodes.BAD_REQUEST
      : StatusCodes.UNPROCESSABLE_ENTITY;
    return res.status(result).json({ message: err.message });
  }
  next();
};