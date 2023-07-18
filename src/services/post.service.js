const { BlogPost, PostCategory, sequelize } = require('../models');

const createBlogPost = async ({ userId, title, content, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create(
      { title, content, userId, published: new Date(), updated: new Date() },
      { transaction: t },
    );
    await Promise.all(categoryIds.map(async (categoryId) => {
      const { id } = post.dataValues;
      await PostCategory.create({ postId: id, categoryId }, { transaction: t });
    }));

    return post;
  });

  return result;
};

module.exports = {
  createBlogPost,
};
