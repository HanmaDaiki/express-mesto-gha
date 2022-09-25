require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const AuthorizationErr = require('../errors/AuthorizationErr');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthorizationErr('Неправильные почта или пароль');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationErr('Неправильные почта или пароль');
  }

  req.user = payload;

  return next();
};
