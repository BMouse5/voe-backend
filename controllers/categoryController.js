const Category = require('../models/categoryModel');

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
    try {
        const newCategory = await Category.createCategory(name, description, parent_id || null);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании категории' });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, parent_id } = req.body;
    try {
        const updatedCategory = await Category.updateCategory(id, name, description, parent_id || null);
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении категории' });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Category.deleteCategory(id);
        res.json(result);
    } catch (error) {
        if (error.message.includes('Нельзя удалить категорию')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Ошибка при удалении категории' });
        }
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