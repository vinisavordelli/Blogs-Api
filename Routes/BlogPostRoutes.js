const express = require('express');
const {
  findAll,
  findOne,
  createPost,
  updatePost,
  deletePost,
  searchPost,
} = require('../controllers/BlogPostController');
const {
  validateBlogPostCreation,
  validatePostUpdate,
} = require('../middlewares/ValidateBlogPost');
const { ValidateToken } = require('../middlewares/ValidateToken');

const router = express.Router();

router
.get('/search', ValidateToken, searchPost)
.get('/', ValidateToken, findAll)
.get('/:id', ValidateToken, findOne)
.post(
'/',
ValidateToken,
validateBlogPostCreation, 
createPost,
)
.put('/:id', ValidateToken, validatePostUpdate, updatePost)
.delete('/:id', ValidateToken, deletePost);
module.exports = router;