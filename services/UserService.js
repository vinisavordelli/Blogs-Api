const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return { err: { message: 'User already registered' } };
  } 
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
    return ({ message: 'Unknown error' });
  }
};

const findOne = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return { err: { message: 'User does not exist' } };
    }
    return user;
  } catch (err) {
    console.log(err);
    return ({ message: 'Unknown error' });
  }
};

const deleteMe = async (id) => {
  try {
   const user = await User.destroy({ where: { id } });
   return user;
  } catch (err) {
    console.log(err);
    return ({ message: 'Unknown error' });
  }
};

module.exports = {
  createUser,
  findAll,
  findOne,
  deleteMe,
};