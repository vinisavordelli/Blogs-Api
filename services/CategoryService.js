const { Category } = require('../models');

const findAll = async () => {
  try {
    const Categories = await Category.findAll();
    return Categories;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findAll,
};