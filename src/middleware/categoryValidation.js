const { CategoryService } = require('../services');

const categoryNameValidation = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  const alreadyExist = await CategoryService.getCategoryByName({ name });

  if (alreadyExist) return res.status(409).json({ message: 'Category already registered' });

  return next();
};

module.exports = {
  categoryNameValidation,
};