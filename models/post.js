const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  image_url: String,
  user_id: String,
  likes: Array,
  comments: [{
    author: String,
    message: String,
    created_at: Date
  }],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
