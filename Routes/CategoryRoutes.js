const express = require('express');
const { findAll, createCategory } = require('../controllers/CategoryController');
const { validateCategory } = require('../middlewares/ValidateCategory');
const { ValidateToken } = require('../middlewares/ValidateToken');

const router = express.Router();

router
.get('/', ValidateToken, findAll)
.post('/', validateCategory, ValidateToken, createCategory);

module.exports = router;