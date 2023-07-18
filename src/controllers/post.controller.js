const { PostService } = require('../services');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = 1;
    const post = await PostService.createBlogPost({ userId, title, content, categoryIds });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlogPosts = async (_req, res) => {
  const posts = await PostService.getBlogPosts();

  return res.status(200).json(posts);
};

module.exports = {
  createBlogPost,
  getBlogPosts,
};
