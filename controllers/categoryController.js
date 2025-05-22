const Category = require('../models/categoryModel');
const path = require('path');
const fs = require('fs');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении категорий' });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении категории' });
    }
};

const getChildCategories = async (req, res) => {
    const { id } = req.params;
    try {
        const children = await Category.getChildCategories(id);
        res.json(children);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении дочерних категорий' });
    }
};

const getProductsCount = async (req, res) => {
    const { id } = req.params;
    try {
        const count = await Category.getProductsCountInCategory(id);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при проверке товаров' });
    }
};

const createCategory = async (req, res) => {
    const { name, description, parent_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description) {
        return res.status(400).json({ error: 'Название и описание обязательны' });
    }

    try {
        const newCategory = await Category.createCategory(name, description, parent_id || null, image_url);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании категории' });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, parent_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const existingCategory = await Category.getCategoryById(id);
        if (!existingCategory) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }

        // Удаляем старое изображение, если загружено новое
        if (image_url && existingCategory.image_url) {
            const oldImagePath = path.join(__dirname, '..', 'uploads', existingCategory.image_url.split('/').pop());
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const finalImageUrl = image_url || existingCategory.image_url;
        const updatedCategory = await Category.updateCategory(id, name, description, parent_id || null, finalImageUrl);
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении категории' });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Получаем категорию и проверяем существование
        const category = await Category.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }

        // 2. Получаем актуальный список подкатегорий
        const subcategories = await Category.getChildCategories(id);

        // 3. Проверяем наличие товаров во всех категориях
        for (const subcategory of [category, ...subcategories]) {
            const productsCount = await Category.getProductsCountInCategory(subcategory._id);
            if (productsCount > 0) {
                return res.status(400).json({ 
                    success: false, 
                    error: `Нельзя удалить категорию, так как в категории "${subcategory.name}" есть товары`
                });
            }
        }

        // 4. Удаляем категорию и подкатегории
        const result = await Category.deleteCategory(id);
        if (result) {
            for (const cat of [category, ...subcategories]) {
                if (cat.image_url) {
                    const imagePath = path.join(__dirname, '..', 'uploads', cat.image_url.split('/').pop());
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
            }
        }

        res.json({
            success: true,
            message: 'Категория и подкатегории успешно удалены',
            deletedCount: 1 + subcategories.length
        });

    } catch (error) {
        console.error('Ошибка при удалении категории:', error);
        res.status(500).json({ 
            success: false,
            error: 'Ошибка при удалении категории'
        });
    }
};




module.exports = { 
    getCategories,
    getCategoryById,
    getChildCategories,
    getProductsCount,
    createCategory,
    updateCategory,
    deleteCategory
};