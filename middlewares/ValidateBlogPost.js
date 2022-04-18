const Joi = require('joi');
const StatusCodes = require('http-status-codes');
const Category = require('../services/CategoryService');

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.any(),
});

const validateCategoryExists = async (req) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll();
  const allIds = categories.map(({ id }) => id);
  const verifyIds = categoryIds.every((id) => allIds.includes(id));
  if (!verifyIds) return false;
  return true;
};

const validateBlogPostCreation = async (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  const validateCategory = await validateCategoryExists(req);
  if (validateCategory === false) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  next();
};

const validatePostUpdate = async (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
  const { categoryIds } = req.body;
  if (categoryIds) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Categories cannot be edited' });
  }
  next();
};

module.exports = {
  validateBlogPostCreation,
  validateCategoryExists,
  validatePostUpdate,
};