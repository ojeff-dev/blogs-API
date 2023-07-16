const express = require('express');

const { UserController } = require('../controllers');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('../middleware/userValidation');

const route = express.Router();

route.post(
  '/',
  displayNameValidation,
  emailValidation,
  passwordValidation,
  UserController.createUser,
  );

module.exports = route;
