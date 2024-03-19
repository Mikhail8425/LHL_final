const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const login = express.Router();


login.post('/', async (req, res) => {
  console.log('login route');
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  console.log('post/user', user);
  if (user) {
    res.json({ user, success: true });
  } else {
    res.json({ user: null, success: false });
  }
});

module.exports = login;