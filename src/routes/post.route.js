const express = require('express');

const { PostController } = require('../controllers');
const tokenValidation = require('../middleware/JWTValidation');
const {
  checkTheFields,
  PUTValidations,
  DELETEValidation,
} = require('../middleware/postValidation');

const route = express.Router();

route.get('/', tokenValidation, PostController.getBlogPosts);

route.get('/search', tokenValidation, PostController.searchTermInBlogPost);

route.get('/:id', tokenValidation, PostController.getBlogPostById);

route.post('/', tokenValidation, checkTheFields, PostController.createBlogPost);

route.put('/:id', tokenValidation, PUTValidations, PostController.updateBlogPost);

route.delete('/:id', tokenValidation, DELETEValidation, PostController.removeBlogPost);

module.exports = route;
