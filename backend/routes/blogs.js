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
blogs.put('/', async (req, res) => {
  
  const { id, title, date, description, image, user_id, username, image_label, likes } = req.body;
  try {
    const result = await query('UPDATE posts SET title = $1, date = $2, description = $3, image = $4, image_label = $5, likes = $6 WHERE id = $7 RETURNING *', [title, date, description, image, image_label, likes, id]);
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
blogs.delete('/', async (req, res) => {
  const { id, user_id } = req.body;
  console.log("Deleting post with ID:", id, "and user ID:", user_id);
  try {
    const result = await query('DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *', [id, user_id]);
    if (result.rows.length === 0) {
      console.log("Post not found");
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log("Post deleted successfully:", result.rows[0]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = blogs;
