// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.send('Admin dashboard');
});

// Добавьте другие защищенные маршруты админки

module.exports = router;