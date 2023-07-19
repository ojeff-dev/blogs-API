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

const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.getById(Number(id));

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(user);
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

const removeUser = async (req, res) => {
  try {
    const { data } = req.payload;
    const userId = data.id;

    const isRemoved = await UserService.removeUser(userId);

    if (isRemoved > 0) return res.sendStatus(204);

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getByUserId,
  createUser,
  removeUser,
};
