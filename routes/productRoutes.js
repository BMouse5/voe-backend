const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');



const router = express.Router();


// Настройка multer для сохранения изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Папка, куда будут сохраняться изображения
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname); // Генерация уникального имени файла
      cb(null, fileName);
    }
  });
  
const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;