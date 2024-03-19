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

module.exports = login;



