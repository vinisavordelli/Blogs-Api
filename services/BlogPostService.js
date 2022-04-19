const { BlogPost, User, Category, PostCategory } = require('../models');

const createPost = async ({ title, content, categoryIds, userId }) => {
    const newPost = await BlogPost.create({
      userId,
      title,
      content,
    });
    categoryIds.forEach(async (categoryId) => {
      const newPostCategory = { postId: newPost.id, categoryId };
      await PostCategory.create(newPostCategory);
    });

    return newPost;
};

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
    return ({ message: 'Unknown error' });
  }
};

const deletePost = async (id) => {
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
    await BlogPost.destroy({ where: { id } });
    return blogPost;
  } catch (err) {
    console.log(err);
    return ({ message: 'Unknown error' });
  }
};

const updatePost = async (id, title, content) => {
  try {
    await BlogPost.update({ title, content }, { where: { id } });

    const updatedPost = await BlogPost.findOne({
      where: { id },
      attributes: ['title', 'content', 'userId'],
      include: [
         { model: Category, as: 'categories', through: { attributes: [] } },
        ], 
      });
    
    return updatedPost;
  } catch (err) {
    console.log(err);
    return ({ message: 'Unknown error' });
  }
};

module.exports = { findAll, findOne, createPost, updatePost, deletePost };