const express = require('express');
const blogs = express.Router();
const db = require('../db/db.js');
const cors = require('cors');
const { query } = require('../db/db');
blogs.use(cors({ origin: 'http://localhost:3000' }));

// Get all posts
blogs.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get a single post by ID
blogs.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new post
blogs.post('/', async (req, res) => {
  const { title, date, description, image, user_id, username, image_label, likes } = req.body;
  try {
    const result = await query('INSERT INTO posts (title, date, description, image, user_id, username, image_label, likes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, date, description, image, user_id, username, image_label, likes]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a post by ID
blogs.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, description, image, user_id, username, image_label, likes } = req.body;
  try {
    const result = await query('UPDATE posts SET title = $1, date = $2, description = $3, image = $4, user_id = $5, username = $6, image_label = $7, likes = $8 WHERE id = $9 RETURNING *', [title, date, description, image, user_id, username, image_label, likes, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a post by ID
blogs.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = blogs;
