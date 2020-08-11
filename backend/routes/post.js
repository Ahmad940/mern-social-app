const express = require('express');
const auth = require('../middlewares/auth');
const banned = require('../middlewares/banned');

const { PostModel } = require('../models/postModel');

const router = express.Router();

router.get('/', (req, res) => res.send('yoshi from the post route'));

router.get('/posts', async (req, res) => {
  const posts = await PostModel.find()
    .sort('-createdAt')
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err));
});

router.post('/like', auth, async (req, res) => {
  // retrieving the post id
  const { postId } = req.body;
  // retrieving the user id
  const userId = req.user._id;

  // getting the post data
  const posts = await PostModel.findById(postId);

  // checking if the post actually exist
  if (!posts)
    return res
      .status(400)
      .send('Post not found, the post might have benn deleted by user');

  // getting the likes object
  const likes = posts.likes.map((data) => data.toString());

  // checking if the user id exist in likes or not
  const operator = likes.includes(userId) ? '$pull' : '$addToSet';

  // updating the posts
  try {
    const updateLikes = await PostModel.findByIdAndUpdate(
      postId,
      {
        [operator]: {
          likes: userId,
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

router.post('/new', auth, async (req, res) => {
  const { text } = req.body;
  const author = req.user._id;
  const userName = `${req.user.firstName} ${req.user.lastName}`;

  const post = new PostModel({
    text,
    author,
    userName,
  });

  await post
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
