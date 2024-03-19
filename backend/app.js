var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db');
const bcrypt = require("bcrypt");
const { query } = require('./db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const watchlistsRouter = require('./routes/watchlists');
const stocksRouter = require('./routes/stocks');
const loginRouter = require('./routes/login');

var app = express();


function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

app.get("/abcde", async (req, res) => {
  const data = await read("abc.txt");
  res.send('abcde')
  // return res.status(200).json({ data });
});

app.post("/abc", async (req, res) => {
  console.log(req.body);
  return res.status(200).json({ success: true });
});
//use section
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/watchlists', watchlistsRouter);
app.use('/stocks', stocksRouter);
app.use('/login', loginRouter);

app.post("/register", (request, response) => {

// hash the password
bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
      // Execute an SQL query to insert the new user into the database
      const insertUserQuery = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *';
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

// Define your route handler for login
app.post("/login", (request, response) => {
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
          if (!passwordCheck) {
            return response.status(400).json({ message: "Passwords do not match" });
          }

          // Generate JWT token
          const token = jwt.sign(
            {
              userId: user.id,
              userEmail: user.email,
            },
            "YOUR_SECRET_KEY", // Replace with your secret key
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



module.exports = app;
