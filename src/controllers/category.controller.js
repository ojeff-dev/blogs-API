const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await CategoryService.createCategory({ name });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
};
