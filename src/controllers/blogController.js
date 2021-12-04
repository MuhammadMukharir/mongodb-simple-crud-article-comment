const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};


exports.allBlogPost = async (req, res) => {
  try {
    const { page, size, title,
      sortUpdatedAt = 1,
      sortCreatedAt = 1,
      sortTitle = 1,
      sortCategory = 1,
      sortAuthor = 1,
    } = req.query;
    let condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const { limit, offset } = getPagination(page, size);

    let articles = await Blog.paginate(
      condition,
      {
        select: 'title category author createdAt updatedAt',
        sort: { createdAt: sortCreatedAt, updatedAt: sortUpdatedAt, title: sortTitle, category: sortCategory, author: sortAuthor },
        offset, limit
      }
    )

    // let posts = await Blog.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addBlogPost = async (req, res) => {
  try {
    const post = new Blog({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author
    });
    let newPost = await post.save();
    res.status(200).json({ data: newPost });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const id = req.params.blogId;
    let result = await Blog.findById({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const id = req.params.blogId;
    let result = await Blog.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const id = req.params.blogId;
    let result = await Blog.deleteOne({ _id: id });
    let deleteComment = await Comment.deleteMany({ article: id })
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};