const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({
    displayName,
    email,
    password,
    image,
  });

  return user;
};

const findAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  findAll,
};