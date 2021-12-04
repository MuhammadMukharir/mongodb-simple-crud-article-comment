const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

let BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
},
  { timestamps: true }
);

BlogSchema.plugin(mongoosePaginate);

let Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;