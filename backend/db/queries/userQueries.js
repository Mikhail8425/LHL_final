const { query } = require("../db");

const queries = {};

queries.getUserByEmail = (email) => {
  const queryStr = `SELECT * FROM users WHERE email LIKE $1`;
  const args = [email];
  return query(queryStr, args).then(res => res.rows[0]);
};

queries.authenticateUser = (email, password) => {
  const queryStr = `SELECT * FROM users WHERE email LIKE $1`;
  const args = [email];
  return query(queryStr, args);
};

module.exports = queries