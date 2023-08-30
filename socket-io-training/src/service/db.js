const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'fastcheck',
  user: 'postgres',
  password: 'password',
});

const result = pool.query('SELECT * FROM tb_genero');
console.log(result);