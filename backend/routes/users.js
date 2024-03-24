// users.js
const express = require('express');
const router = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/", async (req, res) => {

  return res.status(200).json({ success: true });
});

module.exports = router;