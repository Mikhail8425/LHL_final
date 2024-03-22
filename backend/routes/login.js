const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const login = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');

// Define your route handler for login
login.post("/", (request, response) => {
  const { email, password } = request.body;

  // Check if email exists in the database
  const getUserQuery = 'SELECT * FROM users WHERE email = $1';
  query(getUserQuery, [email])
    .then((result) => {
      const user = result.rows[0];

      // If email does not exist
      if (!user) {
        return response.status(404).json({ message: "Email not found" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password)
        .then((passwordCheck) => {
          console.log("Password comparison result:", password, user.password); // Add this line for console log
          if (!passwordCheck) {
            return response.status(400).json({ message: "Passwords do not match" });
          }

          // Generate JWT token
          const token = jwt.sign(
            {
              userId: user.id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN", // Replace with your secret key
            { expiresIn: "24h" }
          );

          // Return success response with token
          response.status(200).json({
            message: "Login Successful",
            email: user.email,
            token: token,
            userId: user.id,
            username: user.username
          });
        })
        .catch((error) => {
          response.status(500).json({ message: "Error comparing passwords", error: error.message });
        });
    })
    .catch((error) => {
      response.status(500).json({ message: "Error retrieving user", error: error.message });
    });
});

// Route to change email
login.put('/', async (req, res) => {
  const { email, password, id: userId } = req.body;
  
  // console.log("email", "password", "id", email, password, userId, req.body);

  try {
    if (email) {
      // Update email
      const updateEmailQuery = `
        UPDATE users 
        SET email = $1
        WHERE id = $2
        RETURNING *;
      `;
      const result = await query(updateEmailQuery, [email, userId]);
      res.json(result.rows[0]);
    } else if (password) {
      // Update password
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatePasswordQuery = `
        UPDATE users 
        SET password = $1
        WHERE id = $2;
      `;
      await query(updatePasswordQuery, [hashedPassword, userId]);
      res.send("Password updated successfully");
    } else {
      res.status(400).send("Bad request: Neither email nor password provided.");
    }
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).send("Error updating");
  }
});



module.exports = login;



