require('dotenv').config();

const jwtSetup = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  algorithm: process.env.JWT_ALGORITHM,
};

module.exports = {
  jwtSetup,
};