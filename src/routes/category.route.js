const express = require('express');

const { CategoryController } = require('../controllers');
const tokenValidation = require('../middleware/JWTValidation');
const { categoryNameValidation } = require('../middleware/categoryValidation');

const route = express.Router();

route.get('/', tokenValidation, CategoryController.getCategories);

route.post('/', tokenValidation, categoryNameValidation, CategoryController.createCategory);

module.exports = route;
