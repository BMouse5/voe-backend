const pool = require('../db');

const getAllCategories = async () => {
    const result = await pool.query(`
        SELECT * FROM categories
        ORDER BY parent_id, id
    `);
    return result.rows;
};

const getCategoryById = async (id) => {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
};

const getChildCategories = async (parentId) => {
    const result = await pool.query('SELECT * FROM categories WHERE parent_id = $1', [parentId]);
    return result.rows;
};

const getProductsCountInCategory = async (categoryId) => {
    const result = await pool.query(
        `SELECT COUNT(*) FROM products 
         WHERE category_id = $1 OR category_id IN 
         (SELECT id FROM categories WHERE parent_id = $1)`,
        [categoryId]
    );
    return parseInt(result.rows[0].count);
};

const createCategory = async (name, description, parent_id, image_url) => {
    const result = await pool.query(
        'INSERT INTO categories (name, description, parent_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, parent_id, image_url]
    );
    return result.rows[0];
};

const updateCategory = async (id, name, description, parent_id, image_url) => {
    const result = await pool.query(
        'UPDATE categories SET name = $1, description = $2, parent_id = $3, image_url = $4 WHERE id = $5 RETURNING *',
        [name, description, parent_id, image_url, id]
    );
    return result.rows[0];
};

const deleteCategory = async (id) => {
    const productsCount = await getProductsCountInCategory(id);
    
    if (productsCount > 0) {
        throw new Error('Нельзя удалить категорию, так как существуют товары в этой категории или её подкатегориях');
    }
    
    await pool.query('DELETE FROM categories WHERE id = $1 OR parent_id = $1', [id]);
    
    return { message: 'Категория и её подкатегории успешно удалены' };
};

module.exports = { 
    getAllCategories, 
    getCategoryById, 
    getChildCategories,
    getProductsCountInCategory,
    createCategory, 
    updateCategory, 
    deleteCategory 
};