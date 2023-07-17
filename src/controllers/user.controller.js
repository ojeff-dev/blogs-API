const { UserService } = require('../services');
const { generateToken } = require('../utils/handleToken');

const getUsers = async (_req, res) => {
  try {
    const users = await UserService.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await UserService.createUser({
      displayName, email, password, image,
    });

    const { password: _password, ...userWithoutPassword } = user.dataValues;

    const payload = { data: userWithoutPassword };
    const token = generateToken(payload);

    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
