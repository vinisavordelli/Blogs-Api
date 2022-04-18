const { BlogPost, User, Category } = require('../models');

const findAll = async () => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return blogPosts;
  } catch (err) {
    console.log(err);
    return ('Category not found');
  }
};

const findOne = async (id) => {
  try {
    const blogPost = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!blogPost) {
      return { err: { message: 'Post does not exist' } };
    }
    return blogPost;
  } catch (err) {
    console.log(err);
    return ('Category not found');
  }
};

module.exports = { findAll, findOne };