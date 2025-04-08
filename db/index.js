const { Pool } = require('pg');

// Конфигурация подключения к базе данных PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Для Render PostgreSQL
    }
});

module.exports = pool;
