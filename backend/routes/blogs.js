// users.js
const express = require('express');
const blogs = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
const cors = require('cors');


blogs.use(cors({ origin: 'http://localhost:3000' }));

blogs.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = blogs;