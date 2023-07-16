const { User } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const createUser = ({
  displayName, email, password, image,
}) => User.create({ displayName, email, password, image });

module.exports = {
  getByEmail,
  createUser,
};
