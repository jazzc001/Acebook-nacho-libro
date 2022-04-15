const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  image_url: String,
  author: Object,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
