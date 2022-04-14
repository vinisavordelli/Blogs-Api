const express = require('express');
const { login } = require('../controllers/LoginController');
const { validateUserLogin } = require('../middlewares/ValidateLogin');

const router = express.Router();

router.post('/', validateUserLogin, login);

module.exports = router;
