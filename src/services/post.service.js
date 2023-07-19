const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');

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

const getBlogPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    },
  ],
});

const getBlogPostById = (postId) => BlogPost.findByPk(postId, {
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    },
  ],
});

const updateBlogPost = async (id, { userId, title, content }) => {
  await BlogPost.update({ title, content }, { where: { id, userId } });

  const post = await getBlogPostById(id);

  return post;
};

const removeBlogPost = (postId, userId) => BlogPost.destroy({ where: { id: postId, userId } });

const searchTermInBlogPost = (term) => BlogPost.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${term}%` } },
      { content: { [Op.like]: `%${term}%` } },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    },
  ],
});

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  removeBlogPost,
  searchTermInBlogPost,
};
