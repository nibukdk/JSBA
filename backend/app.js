const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  app = express();
const CONFIG = require('./config/database');
const PORT = 8080;

let router = require('./routes/recipe.js');


mongoose.connect(CONFIG.database);
mongoose.connection.on('connected', function(){
    console.log("Connected to databse..");
});
mongoose.connection.on('error', function(err){
    console.log("Error on connection..", err.message);
});
app.use(cors()); //Cors package
app.use(bodyParser.json());

//Join to Frontenf
//app.use(express.static(path.join(__dirname,'front-end')));

//Home page
app.get('/', function(req, res) {
  res.send("This is home page.");
});

app.use(router);

app.listen(PORT, function() {
  console.log("Server is running at port", PORT);
});
