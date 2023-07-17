const { Category } = require('../models');

const getCategoryByName = (categoryName) => Category.findOne({ where: categoryName });

const createCategory = (category) => Category.create(category);

module.exports = {
  getCategoryByName,
  createCategory,
};
