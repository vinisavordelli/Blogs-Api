require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSetup = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createJWT = (data) => {
  const token = jwt.sign({ data }, jwtSetup.secret, {
    expiresIn: jwtSetup.expiresIn,
});
return token;
};

const validateToken = (token) => {
  const validate = jwt.verify(token, jwtSetup.secret);
  return validate;
};

module.exports = {
  createJWT,
  validateToken,
};