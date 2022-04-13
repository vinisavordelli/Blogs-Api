const express = require('express');

const { UserController } = require('../controllers/UserController');
const { validateUser } = require('../middlewares/ValidateUser');

const router = express.Router();

router.post(
  '/',
  validateUser,
  UserController.createUser,
);

module.exports = {
  UserRoutes: router,
};