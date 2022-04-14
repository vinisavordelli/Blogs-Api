const { BlogPost } = require('../models');

const findAll = async () => {
  try {
    const blogPosts = await BlogPost.findAll();
    return blogPosts;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { findAll };
