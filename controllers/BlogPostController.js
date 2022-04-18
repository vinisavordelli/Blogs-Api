const { StatusCodes } = require('http-status-codes');
const BlogPostService = require('../services/BlogPostService');

const findAll = async (_req, res, next) => {
  try {
    const blogPosts = await BlogPostService.findAll();
    return res.status(StatusCodes.OK).json(blogPosts);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

const findOne = async (req, res, next) => {
  try {
    const blogPost = await BlogPostService.findOne(req.params.id);
    if (blogPost.err) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: blogPost.err.message });
    }
    return res.status(StatusCodes.OK).json(blogPost);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

module.exports = { findAll, findOne };
