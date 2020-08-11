const jwt = require('jsonwebtoken');

require('dotenv').config();

// checking json web token and authentication
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied, No token provided');

  try {
    const secret = process.env.userSecret;
    const decode = jwt.verify(token, secret);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};
