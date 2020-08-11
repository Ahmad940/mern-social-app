const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { request } = require('http');

require('dotenv').config();

let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 10,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 10,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 50,
      required: true,
      lowercase: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 1024,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const secret = process.env.userSecret;
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      isAdmin: this.isAdmin,
      isBanned: this.isBanned,
    },
    secret
  );
};

exports.userSchema = userSchema;
exports.userModels = mongoose.model('users', userSchema);
