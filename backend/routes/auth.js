var express = require('express');
const { userModels } = require('../models/userModel');
const bcrypt = require('bcrypt');
const { route } = require('.');

var router = express.Router();

//  api/auth router
router.get('/', (req, res) => res.send('The /api/auth/ router hanlder Ayy!'));

/*  Register new user */
router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await userModels.findOne({ email });
  if (userExist) return res.status(400).send('The email is already registered');

  const user = new userModels({
    firstName,
    lastName,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  await user
    .save()
    .then(() => {
      const token = user.generateAuthToken();
      res.send(token);
    })
    .catch((err) => res.status(400).send(err.message));
});

// Log in user
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModels.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  const hashedPasspword = await bcrypt.compare(password, user.password);

  if (!hashedPasspword)
    return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
