const { CategoryService } = require('../services');

const checkTheFields = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const categoriesExist = await Promise.all(
    categoryIds.map(async (id) => {
      const category = await CategoryService.getCategoryById(id);

      return !!category;
    }),
  );

  if (!categoriesExist.every((exist) => exist)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  return next();
};

module.exports = {
  checkTheFields,
};
