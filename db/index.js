const { Pool } = require('pg');

// Конфигурация подключения к базе данных PostgreSQL
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Оптимальные настройки для пула соединений
  max: 10,                // Максимальное количество клиентов в пуле
  idleTimeoutMillis: 30000, // Закрыть неиспользуемые соединения после 30 секунд
  connectionTimeoutMillis: 5000 // Время ожидания подключения
});

// Проверка подключения
pool.query('SELECT NOW()')
  .then(res => console.log('Database connection successful:', res.rows[0].now))
  .catch(err => console.error('Database connection error:', err));

module.exports = pool;
