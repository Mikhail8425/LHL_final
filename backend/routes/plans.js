const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const login = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');