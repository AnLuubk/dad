const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The post field is required'],
  },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
