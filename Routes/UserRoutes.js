const express = require('express');
const { createUser, findAll, findOne } = require('../controllers/UserController');
const { ValidateToken } = require('../middlewares/ValidateToken');
const { validateUser } = require('../middlewares/ValidateUser');

const router = express.Router();

router
.post('/', validateUser, createUser)
.get('/', ValidateToken, findAll)
.get('/:id', ValidateToken, findOne);

module.exports = {
  UserRoutes: router,
};