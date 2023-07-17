const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConfig = { algorithm: 'HS256', expiresIn: '2h' };

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const getPayload = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  getPayload,
};
