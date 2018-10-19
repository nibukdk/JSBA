let passport = require('passport'),
  mongoose = require('mongoose'),
  passportLocal=require('passport-local'),
  bcrypt = require('bcryptjs'),
  config = require('../config/database');


let RecipeSchema = mongoose.Schema({
  name:String,
  description:String,
  image:String,
  ingredients:[ String ],
  created: {
    type: Date,
    default: Date.now
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
