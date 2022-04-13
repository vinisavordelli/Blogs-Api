const express = require('express');
const { createUser, findAll } = require('../controllers/UserController');
const { validateUser } = require('../middlewares/ValidateUser');

const router = express.Router();

router
.post('/', validateUser, createUser)
.get('/', findAll);

module.exports = {
  UserRoutes: router,
};