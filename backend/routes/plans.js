const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const plans = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');

plans.post("/", async (request, response) => {
  try {
    // Extract user ID and plan name from request body
    const { userId, planName } = req.body;

    // Insert data into 'posts' table
    const query = `
      INSERT INTO posts (plan_name, user_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [userId, planName];
    const result = await pool.query(query, values);

    // Send success response with inserted data
    res.status(201).json({
      success: true,
      message: 'Plan added successfully',
      post: result.rows[0],
    });
  } catch (error) {
    // Send error response if insertion fails
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating plan',
      error: error.message,
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


module.exports = plans;