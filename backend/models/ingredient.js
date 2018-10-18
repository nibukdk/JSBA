let passport = require('passport'),
  mongoose = require('mongoose'),
  passportLocal=require('passport-local'),
  bcrypt = require('bcryptjs'),
  config = require('../config/database');


let IngredientSchema = mongoose.Schema({
  name:String,
  amount:String,
  belongsTo:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }]
});
const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
