const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Получение категорий
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/children/:id', categoryController.getChildCategories);
router.get('/:id/products', categoryController.getProductsCount);

// Управление категориями
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;