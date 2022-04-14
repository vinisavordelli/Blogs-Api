const { StatusCodes } = require('http-status-codes');
const CategoryService = require('../services/CategoryService');

const findAll = async (_req, res, next) => {
  try {
    const users = await CategoryService.findAll();
    return res.status(StatusCodes.OK).json(users);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

module.exports = {
  findAll,
};