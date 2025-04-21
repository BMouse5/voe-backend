// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { login, loginLimiter } = require('../middlewares/auth');

router.post('/logout', authController.logout);
router.post('/login', loginLimiter, login);

module.exports = router;