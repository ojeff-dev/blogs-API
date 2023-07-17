const express = require('express');

const { CategoryController } = require('../controllers');
const tokenValidation = require('../middleware/JWTValidation');
const { categoryNameValidation } = require('../middleware/categoryValidation');

const route = express.Router();

route.post('/', tokenValidation, categoryNameValidation, CategoryController.createCategory);

module.exports = route;
