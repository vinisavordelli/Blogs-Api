const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');
const { createJWT } = require('../helpers/auth');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const newUser = { displayName, email, password, image };
  try {
    const user = await UserService.createUser(newUser);
    if (user.err) {
      return res.status(StatusCodes.CONFLICT).json({ message: user.err.message });
    }
    const token = createJWT(user);
    return res.status(StatusCodes.CREATED).json({ token });
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

const findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserService.findOne(id);
    if (user.err) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: user.err.message });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

const deleteMe = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UserService.deleteMe(userId);
    if (user.err) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: user.err.message });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  findAll,
  findOne,
  deleteMe,
};
