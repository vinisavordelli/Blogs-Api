const express = require('express');
const { findAll, findOne, createPost } = require('../controllers/BlogPostController');
const {
  validateBlogPostCreation,
} = require('../middlewares/ValidateBlogPost');
const { ValidateToken } = require('../middlewares/ValidateToken');

const router = express.Router();

router
.get('/', ValidateToken, findAll)
.get('/:id', ValidateToken, findOne)
.post(
'/',
ValidateToken,
validateBlogPostCreation, 
createPost,
);
module.exports = router;