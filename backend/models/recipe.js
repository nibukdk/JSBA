let passport = require('passport'),
  mongoose = require('mongoose'),
  passportLocal=require('passport-local'),
  bcrypt = require('bcryptjs'),
  config = require('../config/database');


let RecipeSchema = mongoose.Schema({
  name:String,
  description:String,
  image:String,
  ingredients:[ String ]
});
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
