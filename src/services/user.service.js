const { User } = require('../models');

const getUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const getById = (userId) => User.findByPk(userId, { attributes: { exclude: ['password'] } });

const createUser = ({
  displayName, email, password, image,
}) => User.create({ displayName, email, password, image });

module.exports = {
  getUsers,
  getByEmail,
  getById,
  createUser,
};
