const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Настройка multer для сохранения изображений
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'voe-energy',
    format: async (req, file) => 'png', // или jpeg
    public_id: (req, file) => Date.now().toString()
  }
});
  
const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;