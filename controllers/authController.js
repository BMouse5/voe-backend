// controllers/authController.js
const { login } = require('../middlewares/auth');

exports.login = login;

exports.logout = (req, res) => {
  res.send({ message: 'Logged out successfully' });
};