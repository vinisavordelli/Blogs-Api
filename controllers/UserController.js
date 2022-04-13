const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  console.log(email);
  const newUser = { displayName, email, password, image };
  try {
    const user = await UserService.createUser(newUser);
    return res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

const findAll = async (_req, res, next) => {
  try {
    const users = await UserService.findAll();
    return res.status(StatusCodes.OK).json(users);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  findAll,
};
