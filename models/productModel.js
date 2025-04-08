const pool = require('../db');

const getAllProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

const createProduct = async (name, description, category_id, image_url) => {
    try {
        console.log('Пытаемся добавить товар в базу данных с данными:', {
            name, description, category_id, image_url
        });

        const result = await pool.query(
            'INSERT INTO products (name, description, category_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, category_id, image_url]
        );

        console.log('Продукт добавлен в базу:', result.rows[0]); // Логируем результат
        return result.rows[0];
    } catch (error) {
        console.error('Ошибка при добавлении товара в базу данных:', error);
        throw error;  // Перебрасываем ошибку обратно в контроллер
    }
};

const updateProduct = async (id, name, description, category_id, image_url) => {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, category_id = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [name, description, category_id, image_url, id]
    );
    return result.rows[0];
  };

const deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
