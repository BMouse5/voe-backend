const { Pool } = require('pg');

// Конфигурация подключения к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'voe-energy',
    password: 'ramil-voe',
    port: 5432,
});

module.exports = pool;
