const express = require('express');
const { findAll, findOne, createPost } = require('../controllers/BlogPostController');
const { ValidateToken } = require('../middlewares/ValidateToken');

const router = express.Router();

router
.get('/', ValidateToken, findAll)
.get('/:id', ValidateToken, findOne)
.post('/', ValidateToken, createPost);
module.exports = router;