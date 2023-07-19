const express = require('express');

const { UserController } = require('../controllers');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('../middleware/userValidation');

const tokenValidation = require('../middleware/JWTValidation');

const route = express.Router();

route.get('/', tokenValidation, UserController.getUsers);

route.get('/:id', tokenValidation, UserController.getByUserId);

route.delete('/me', tokenValidation, UserController.removeUser);

route.post(
  '/',
  displayNameValidation,
  emailValidation,
  passwordValidation,
  UserController.createUser,
  );

module.exports = route;
