const express = require('express');
const consultationController = require('../controllers/consultationController');

const router = express.Router();

router.post('/', consultationController.createConsultation);

module.exports = router;
