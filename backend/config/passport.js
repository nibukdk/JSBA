let JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt= require('passport-jwt').ExtractJwt,
  User = require('../models/user'),
  Config = require('../config/database');


module.exports = function(passport) {
  let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = Config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.getByUserId({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}
//passport.use(new LocalStrategy(User.authenticate()));
