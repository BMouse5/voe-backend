// productController.js

const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');

const getProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении товаров' });
    }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Ошибка при получении товара:', error);
    res.status(500).json({ error: 'Ошибка при получении товара' });
  }
};

const createProduct = async (req, res) => {
    const { name, description, category_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null; // Путь к изображению
  
    if (!name || !description || !category_id || !image_url) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
  
    try {
      const newProduct = await Product.createProduct(name, description, category_id, image_url);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      res.status(500).json({ error: 'Ошибка при создании товара' });
    }
  };

  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, category_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;  // Если новое изображение загружено, то используем его
  
    try {
      // Получаем текущий товар по ID
      const existingProduct = await Product.getProductById(id);
  
      if (!existingProduct) {
        return res.status(404).json({ error: 'Товар не найден' });
      }
  
      // Если новое изображение было загружено, удаляем старое изображение
      if (image_url) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', existingProduct.image_url.split('/').pop());
  
        // Проверяем, существует ли старое изображение, и если да, удаляем его
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);  // Удаляем старое изображение
          console.log(`Старое изображение ${oldImagePath} удалено`);
        } else {
          console.log(`Старое изображение ${oldImagePath} не найдено, удаление не требуется`);
        }
      }
  
      // Если изображение не было загружено, используем старое изображение
      const finalImageUrl = image_url || existingProduct.image_url;
  
      // Обновляем товар с новым или старым изображением
      const updatedProduct = await Product.updateProduct(id, name, description, category_id, finalImageUrl);
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
      res.status(500).json({ error: 'Ошибка при обновлении товара' });
    }
  };
  
  

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Получаем информацию о товаре перед удалением
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    // Проверяем, есть ли изображение, и удаляем его
    if (product.image_url) {
      const imagePath = path.join(__dirname, '..', 'uploads', product.image_url.split('/').pop());

      // Проверяем, существует ли файл перед удалением
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);  // Удаляем файл
        console.log(`Файл ${imagePath} удален`);
      } else {
        console.log(`Файл ${imagePath} не найден, удаление не требуется`);
      }
    }

    // Удаляем товар из базы данных
    await Product.deleteProduct(id);
    res.status(204).json({ message: 'Товар успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};