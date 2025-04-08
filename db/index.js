const { Pool } = require('pg');

// Конфигурация подключения к базе данных PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Ошибка подключения к базе данных:', err);
    } else {
      console.log('Успешное подключение к базе данных. Текущее время:', res.rows[0].now);
    }
  });

module.exports = pool;
