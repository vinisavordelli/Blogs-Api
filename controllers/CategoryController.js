const { StatusCodes } = require('http-status-codes');
const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await CategoryService.createCategory({ name });
    return res.status(StatusCodes.CREATED).json(category);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

const findAll = async (_req, res, next) => {
  try {
    const categories = await CategoryService.findAll();
    return res.status(StatusCodes.OK).json(categories);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

module.exports = {
  findAll,
  createCategory,
};