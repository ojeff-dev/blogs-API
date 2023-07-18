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
  try {
    const posts = await PostService.getBlogPosts();

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await PostService.getBlogPostById(id);

    if (!posts) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
};
