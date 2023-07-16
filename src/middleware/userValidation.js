const { UserService } = require('../services');

const displayNameValidation = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json(
      {
        message: '"displayName" length must be at least 8 characters long',
      },
    );
  }

  return next();
};

const emailValidation = async (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const user = await UserService.getByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  return next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json(
      {
        message: '"password" length must be at least 6 characters long',
      },
    );
  }

  return next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
};
