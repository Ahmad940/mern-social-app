const mongoose = require('mongoose');
const { userSchema, userModels } = require('./userModel');
const { type } = require('os');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      minlength: 1,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    fullName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      minlength: 1,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    comments: [
      {
        type: commentSchema,
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model('comments', commentSchema);
const Post = mongoose.model('posts', postSchema);

exports.commentSchema = commentSchema;
exports.CommentModel = Comment;
exports.PostModel = Post;
