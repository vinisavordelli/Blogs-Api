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

module.exports = {
  createUser,
};