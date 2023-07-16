const express = require('express');

const { LoginController } = require('../controllers');

const route = express.Router();

route.post('/', LoginController.signIn);

module.exports = route;
