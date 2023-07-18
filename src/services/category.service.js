const { Category } = require('../models');

const getCategories = () => Category.findAll();

const getCategoryByName = (categoryName) => Category.findOne({ where: categoryName });

const getCategoryById = (categoryId) => Category.findByPk(categoryId);

const createCategory = (category) => Category.create(category);

module.exports = {
  getCategories,
  getCategoryByName,
  createCategory,
  getCategoryById,
};
