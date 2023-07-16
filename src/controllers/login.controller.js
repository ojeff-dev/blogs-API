const { UserService } = require('../services');
const { generateToken } = require('../utils/handleToken');

const bodyIsValid = (email, password) => email && password;

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!bodyIsValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const { password: _password, ...userWithoutPassword } = user.dataValues;

    const payload = { data: userWithoutPassword };
    const token = generateToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signIn,
};
