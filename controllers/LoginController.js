const StatusCodes = require('http-status-codes');
const LoginService = require('../services/LoginService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await LoginService.login({ email, password });
    if (user.err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: user.err.message });
    }
    return res.status(StatusCodes.OK).json({ token: user.token });
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

module.exports = {
  login,
};