const { getPayload } = require('../utils/handleToken');

const handleAuthorization = (authorization) => {
  const extractedAuthorization = authorization.split(' ');

  if (extractedAuthorization.length > 1) {
    return extractedAuthorization[1];
  }

  return extractedAuthorization[0];
};

const jwtValidation = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    const payload = getPayload(handleAuthorization(authorization));
    req.payload = payload;

    next();
  } catch (_error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = jwtValidation;
