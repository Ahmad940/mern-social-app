var express = require('express');
const _ = require('lodash');
const { userModels } = require('../models/userModel');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const banned = require('../middlewares/banned');

var router = express.Router();

/* GET users listing. */
router.get('/', [auth, admin], async (req, res, next) => {
  const users = await userModels
    .find()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

/* GET current user listing. */
router.get('/me', [auth, banned], async (req, res, next) => {
  const user = await userModels
    .findById(req.user._id)
    .then((data) => {
      // checking if the user exist or not
      if (!data) return res.status(400).send('User does not exist');

      res.send(
        _.pick(data, [
          '_id',
          'firstName',
          'lastName',
          'email',
          'isAdmin',
          'isBanned',
          'createdAt',
          'updatedAt',
        ])
      );
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

// getting prefered user
router.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = await userModels
    .findById(id)
    .then((data) => {
      // checking if the user exist or not
      if (!data) return res.status(400).send('User does not exist');

      res.send(
        _.pick(data, [
          '_id',
          'firstName',
          'lastName',
          'email',
          'createdAt',
          'updatedAt',
        ])
      );
    })
    .catch((err) => {
      res.status(400).send('User does not exist');
    });
});

// updating user
router.put('/update', auth, async (req, res) => {
  const id = req.user._id;
  const { firstName, lastName } = req.body;

  const user = await userModels
    .findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
        },
      },
      { new: true }
    )
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

// deleting user
router.delete('/delete', auth, async (req, res) => {
  const id = req.user._id;

  const user = await userModels
    .findByIdAndRemove(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

module.exports = router;
