const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.allComment = async (req, res) => {
  try {
    const { page, size,
      sortUpdatedAt = 1,
      sortCreatedAt = 1,
      sortAuthor = 1,
    } = req.query;

    const { limit, offset } = getPagination(page, size);

    let comment = await Comment.paginate(
      {},
      {
        sort: { createdAt: sortCreatedAt, updatedAt: sortUpdatedAt, author: sortAuthor },
        offset, limit
      }
    )

    // let comments = await Comment.find();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!Blog.findById({ _id: blogId})) {
      res.status(404).json({ messege: 'Article does not exist' });
    }

    const comment = new Comment({
      comment: req.body.comment,
      author: req.body.author,
      article: blogId
    });

    let newComment = await comment.save();
    res.status(200).json({ data: newComment });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const id = req.params.commentId;
    let result = await Comment.findById({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const id = req.params.commentId;
    let result = await Comment.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.commentId;
    let result = await Comment.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};