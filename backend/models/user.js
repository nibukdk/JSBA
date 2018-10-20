let passport = require('passport'),
  mongoose = require('mongoose'),
  //  passportLocal=require('passport-local'),
  bcrypt = require('bcryptjs');
  


let UserSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  recipe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  },

});
//UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.getByUserId = function(id, cb) {
  User.findById(id, cb)
}

module.exports.getByUserName = function(username, cb) {
  const query = {
    username: username
  }
  User.findOne(query, cb);
}

module.exports.addUser = function(newUser, cb) {
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      if(err) throw err;
        newUser.password=hash;
        newUser.save(cb);
    });
  });
}

module.exports.comparePassword= function(typedPassword, hash, cb){
  bcrypt.compare(typedPassword,hash, (err, isMatched)=>{
    if(err){  throw err; }
    return cb(null, isMatched);
  })
};
