var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Import cors
const connectToPostgres = async () => await sequelize.authenticate();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reminderRouter = require('./routes/reminder');
var espRouter = require('./routes/esp');
const { sequelize } = require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connectToPostgres()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Could not connect to the database. Exiting now...", err);
  });

// Set up CORS middleware
app.use(cors());
// Set up CORS middleware with specific origin
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your allowed origin
  }));
  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reminder', reminderRouter);
app.use('/esp', espRouter);

module.exports = app;
