const jwt = require('jsonwebtoken');

// checking if the current user is banned or not
module.exports = (req, res, next) => {
  const isBanned = req.user.isBanned;
  if (isBanned) return res.status(401).send('The current user is banned');
  next();
};
