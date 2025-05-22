const express = require('express');
const multer = require('multer');
const path = require('path');
const categoryController = require('../controllers/categoryController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Получение категорий
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/children/:id', categoryController.getChildCategories);
router.get('/:id/products', categoryController.getProductsCount);

// Управление категориями
router.post('/', upload.single('image'), categoryController.createCategory);
router.put('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;