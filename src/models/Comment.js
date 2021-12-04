const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

let CommentSchema = mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
},
  { timestamps: true }
);

CommentSchema.plugin(mongoosePaginate);

let Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;