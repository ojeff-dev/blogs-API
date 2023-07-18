const { CategoryService, PostService } = require('../services');

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

const PUTValidations = async (req, res, next) => {
  const { data } = req.payload;
  const { id } = req.params;

  const userId = data.id;
  const post = await PostService.getBlogPostById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = {
  checkTheFields,
  PUTValidations,
};
