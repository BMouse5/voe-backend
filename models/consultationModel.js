const pool = require('../db');

const createConsultation = async (name, email, phone, message) => {
    const result = await pool.query(
        'INSERT INTO consultations (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, phone, message]
    );
    return result.rows[0];
};

module.exports = { createConsultation };
