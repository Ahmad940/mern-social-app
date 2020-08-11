const jwt = require('jsonwebtoken');

// checking if the user is an admin
module.exports = (req, res, next) => {
  const admin = req.user.isAdmin;
  if (!admin) {
    return res.status(403).send('Forbidden, Only admin allowed');
  }
  next();
};
