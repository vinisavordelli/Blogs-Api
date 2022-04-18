const express = require('express');
const { findAll, findOne } = require('../controllers/BlogPostController');
const { ValidateToken } = require('../middlewares/ValidateToken');

const router = express.Router();

router
.get('/', ValidateToken, findAll)
.get('/:id', ValidateToken, findOne);

module.exports = router;