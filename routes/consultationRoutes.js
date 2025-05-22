const express = require('express');
const consultationController = require('../controllers/consultationController');

const router = express.Router();

router.post('/', consultationController.createConsultation);
// Получение всех заявок
router.get('/', consultationController.getAllConsultations);

// Обновление статуса заявки
router.patch('/:id/status', consultationController.updateStatus);

// Удаление заявки
router.delete('/:id', consultationController.deleteConsultation);
module.exports = router;
