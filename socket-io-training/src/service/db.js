require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const result = pool.query('SELECT * FROM tb_genero');
console.log(result);
