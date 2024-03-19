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



module.exports = app;
