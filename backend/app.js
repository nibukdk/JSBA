const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  Recipe = require('./models/recipe'),
  app = express();

const CONFIG = require('./config/database');
const PORT = 8080;

let recipeRoute = require('./routes/recipe.js');
let userRoute = require('./routes/user.js');

app.use(cors()); //Cors package
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);//Require passport-jwt payload token
//Get current user
app.use(function(req, res, next) {
  //res.locals.user = req.user;
  next();
});

//Mongoose Connection
mongoose.connect(CONFIG.database);
mongoose.connection.on('connected', function() {
  console.log("Connected to databse..");
});
mongoose.connection.on('error', function(err) {
  console.log("Error on connection..", err.message);
});

//Home page
app.get('/', function(req, res) {
  Recipe.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});
app.use('/user', userRoute);
//app.use(recipeRoute);

app.listen(PORT, function() {
  console.log("Server is running at port", PORT);
});
