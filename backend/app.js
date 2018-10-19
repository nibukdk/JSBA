const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  Recipe= require('./models/recipe'),
  app = express();

const CONFIG = require('./config/database');
const PORT = 8080;

let recipeRoute = require('./routes/recipe.js');
let userRoute = require('./routes/user.js');




app.use(cors()); //Cors package
app.use(bodyParser.json());

app.use(require("express-session")({
  secret: 'Login is necessary',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//Get current user
app.use(function(req, res, next) {
  //res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});
//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Use of local authentication

//Prevent back button after logout
app.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

//Mongoose Connection
mongoose.connect(CONFIG.database);
mongoose.connection.on('connected', function(){
    console.log("Connected to databse..");
});
mongoose.connection.on('error', function(err){
    console.log("Error on connection..", err.message);
});




app.get('/', function(req, res) {
  Recipe.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});
app.use('/user',userRoute);
//app.use(recipeRoute);

app.listen(PORT, function() {
  console.log("Server is running at port", PORT);
});
