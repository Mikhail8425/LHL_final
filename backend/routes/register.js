const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const register = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');



register.post("/", (request, response) => {

  // hash the password
  bcrypt.hash(request.body.password, 10)
      .then((hashedPassword) => {
        // Execute an SQL query to insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (email, password, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *';
        const queryValues = [request.body.email, hashedPassword, request.body.first_name, request.body.last_name];
  
        query(insertUserQuery, queryValues)
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result: result.rows[0] // Assuming you want to send back the inserted user data
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error: error.message // Send only the error message to avoid exposing sensitive info
            });
          });
      })
      .catch((error) => {
        response.status(500).send({
          message: "Password hashing failed",
          error: error.message // Send only the error message to avoid exposing sensitive info
        });
      });
  });
  
  module.exports = register;