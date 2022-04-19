const { StatusCodes } = require('http-status-codes');
const BlogPostService = require('../services/BlogPostService');

const INTERNAL_ERROR = 'Internal server error';

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
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: INTERNAL_ERROR });
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.parms;
  try {
    const deletedPost = await BlogPostService.deletePost(id);
    if (deletedPost.err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: deletedPost.err.message });
    }
    return res.status(StatusCodes.NO_CONTENT).json(deletedPost);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: INTERNAL_ERROR });
  }
};

const findAll = async (_req, res, next) => {
  try {
    const blogPosts = await BlogPostService.findAll();
    return res.status(StatusCodes.OK).json(blogPosts);
  } catch (err) {
    console.log(err);
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: INTERNAL_ERROR });
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
    next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: INTERNAL_ERROR });
  }
};

const updatePost = async (req, res, next) => {
  const { userId } = req;
  try {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await BlogPostService.updatePost(id, title, content);
  if (updatedPost.err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: updatedPost.err.message });
  }
  if (updatedPost.userId !== userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }
  return res.status(StatusCodes.OK).json(updatedPost);
} catch (err) {
  console.log(err);
  next({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: INTERNAL_ERROR });
}
};

module.exports = { findAll, findOne, createPost, updatePost, deletePost };
