const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

require('dotenv').config();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(logger('dev'));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

mongoose.Promise = global.Promise;

const MONGO_URL = process.env.MONGO_URL;

// Connect MongoDB at default port 27017.
mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      dbDebugger('Connected to database');
      // console.log('MongoDB Connection Succeeded.')
    } else {
      console.log('Error in DB connection: ' + err);
    }
  }
);

module.exports = app;
