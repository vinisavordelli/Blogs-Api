const express = require('express');
const { findAll } = require('../controllers/BlogPostController');
const { ValidateToken } = require('../middlewares/ValidateToken');

const router = express.Router();

router
.get('/', ValidateToken, findAll);

module.exports = router;