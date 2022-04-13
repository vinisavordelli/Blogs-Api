const StatusCodes = require('http-status-codes');
const { validateToken } = require('../helpers/auth');

const ValidateToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    validateToken(token);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { ValidateToken };