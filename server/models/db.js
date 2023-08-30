const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'fastcheck',
  user: 'postgres',
  password: 'password',
});

module.exports = pool;

// pool.query('SELECT * FROM tb_genero').then(res => console.log(res.rows));
// pool.end();
