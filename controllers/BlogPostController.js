const { StatusCodes } = require('http-status-codes');
const BlogPostService = require('../services/BlogPostService');

const createPost = async (req, res, next) => {
  const { userId } = req;
  const { title, content, categoryIds } = req.body;
  const newPost = { title, content, categoryIds, userId };
  try {
    const post = await BlogPostService.createPost(newPost);
    if (post.err) {
      return res.status(StatusCodes.CONFLICT).json({ message: post.err.message });
    }
    return res.status(StatusCodes.CREATED).json(post);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
  }
};

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

const updatePost = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await BlogPostService.updatePost(id, title, content);
  if (updatedPost.err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: updatedPost.err.message });
  }
  return res.status(StatusCodes.OK).json(updatedPost);
} catch (err) {
  console.log(err);
  next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
}
};

module.exports = { findAll, findOne, createPost, updatePost };
