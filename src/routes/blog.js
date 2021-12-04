const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");

// article endpoint
router.get("/article/", blogController.allBlogPost);
router.post("/article/", blogController.addBlogPost);
router.get("/article/:blogId", blogController.getBlogPostById);
router.put("/article/:blogId", blogController.updateBlogPost);
router.delete("/article/:blogId", blogController.deleteBlogPost);

// comment endpoint
router.get("/article/:blogId/comment", commentController.allComment);
router.post("/article/:blogId/comment", commentController.addComment);
router.get("/article/:blogId/comment/:commentId", commentController.getCommentById);
router.put("/article/:blogId/comment/:commentId", commentController.updateComment);
router.delete("/article/:blogId/comment/:commentId", commentController.deleteComment);

module.exports = router;