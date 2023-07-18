const express = require('express');

const { PostController } = require('../controllers');
const tokenValidation = require('../middleware/JWTValidation');
const { checkTheFields } = require('../middleware/postValidation');

const route = express.Router();

route.get('/', tokenValidation, PostController.getBlogPosts);

route.get('/:id', tokenValidation, PostController.getBlogPostById);

route.post('/', tokenValidation, checkTheFields, PostController.createBlogPost);

module.exports = route;
