const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'final_project'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};