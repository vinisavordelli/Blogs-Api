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

module.exports = { findAll };