const Joi = require('joi');
const StatusCodes = require('http-status-codes');
const Category = require('../services/CategoryService');
const { findAll } = require('../services/BlogPostService');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
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
  const { error } = blogPostSchema.validate(req.body);

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

module.exports = {
  validateBlogPostCreation,
  validateCategoryExists,
};