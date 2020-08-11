const express = require('express');
const auth = require('../middlewares/auth');
const banned = require('../middlewares/banned');

const {
  commentSchema,
  CommentModel,
  PostModel,
} = require('../models/postModel');

const router = express.Router();

router.get('/', (req, res) => res.send('yoshi from the comment route'));

router.post('/new', auth, async (req, res) => {
  const { postId, comment } = req.body;
  const author = req.user._id;
  const fullName = `${req.user.firstName} ${req.user.lastName}`;
  //   const userName = `${req.user.firstName} ${req.user.lastName}`;

  const post = await PostModel.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        comments: {
          comment,
          author,
          fullName,
          createdAt: Date.now(),
        },
      },
    },
    { new: true }
  )
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post('/like', auth, async (req, res) => {
  // retrieving the post id
  const { postId, commentId } = req.body;
  // retrieving the user id
  const userId = req.user._id;

  // getting the post data
  const posts = await PostModel.findById(postId);

  // checking if the post actually exist
  if (!posts)
    return res
      .status(400)
      .send('Post not found, the post might have benn deleted by user');

  // const cId = posts.comments.find((c) => c._id === commentId);
  // console.log(posts.comments);
  // console.log(cId);
  // if (!cId) return res.status(400).send('Comment is Not found');

  // getting the likes object
  const likes = posts.comments.map((data) => data.likes);

  console.log(likes);

  // checking if the user id exist in likes or not
  const operator = likes.includes(userId) ? '$pull' : '$addToSet';

  // updating the posts
  try {
    const updateLikes = await PostModel.findByIdAndUpdate(
      postId,
      {
        [operator]: {
          'comments.likes': userId,
        },
      },
      { new: true }
    );

    const fetchNewPost = await PostModel.find()
      .sort('-createdAt')
      .then((data) => res.send(data))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }

  // .then((data) => res.send(data))
  // .catch((err) => res.status(400).send(err));
});

module.exports = router;
