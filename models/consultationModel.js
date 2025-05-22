const pool = require('../db');

// Создание заявки (теперь с дефолтным status_id = 1 - "Новая")
const createConsultation = async (name, email, phone, message) => {
    const result = await pool.query(
        'INSERT INTO consultations (name, email, phone, message, status_id) VALUES ($1, $2, $3, $4, 1) RETURNING *',
        [name, email, phone, message]
    );
    return result.rows[0];
};

// Получение всех заявок (со статусами)
const getAllConsultations = async () => {
    const result = await pool.query(`
        SELECT c.*, s.name as status_name 
        FROM consultations c
        JOIN statuses s ON c.status_id = s.id
        ORDER BY c.id DESC
    `);
    return result.rows;
};

// Обновление статуса заявки
const updateConsultationStatus = async (id, status_id) => {
    const result = await pool.query(
        'UPDATE consultations SET status_id = $1 WHERE id = $2 RETURNING *',
        [status_id, id]
    );
    return result.rows[0];
};

// Удаление заявки
const deleteConsultation = async (id) => {
    const result = await pool.query(
        'DELETE FROM consultations WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = {
    createConsultation,
    getAllConsultations,
    updateConsultationStatus,
    deleteConsultation
};