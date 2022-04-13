const express = require('express');
const { createUser, findAll } = require('../controllers/UserController');
const { ValidateToken } = require('../middlewares/ValidateToken');
const { validateUser } = require('../middlewares/ValidateUser');

const router = express.Router();

router
.post('/', validateUser, createUser)
.get('/', ValidateToken, findAll);

module.exports = {
  UserRoutes: router,
};