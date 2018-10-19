let passport = require('passport'),
  mongoose = require('mongoose'),
  passportLocal=require('passport-local'),
  passportLocalMongoose= require('passport-local-mongoose'),
  bcrypt = require('bcryptjs'),
  config = require('../config/database');


let UserSchema = mongoose.Schema({
    username: String,
    password:String,
    recipe_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Recipe"
    },

});
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
