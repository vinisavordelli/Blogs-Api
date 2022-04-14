const { Category } = require('../models');

const findAll = async () => {
  try {
    const Categories = await Category.findAll();
    return Categories;
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async ({ name }) => {
  const existingCategory = await Category.findOne({ where: { name } });
  if (existingCategory) {
    return { err: { message: 'Category already exists' } };
  } 
  const category = await Category.create({
    name,
  });

  return category;
};

module.exports = {
  findAll,
  createCategory,
};