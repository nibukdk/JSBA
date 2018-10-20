const express = require('express'),
  router = express.Router(),
  passport = require('passport');
jwt = require('jsonwebtoken'),
  User = require('../models/user');
  const CONFIG = require('../config/database');



//Registration
router.post('/register', function(req, res) {
  let username = req.body.username,
    password = req.body.password,
    name = req.body.name,
    email = req.body.email;
  let newUser = new User({
    username: username,
    password: password,
    email: email,
    name: name
  });

  User.addUser(newUser, function(err, usr) {
    if (err) {
      res.json({
        msg: "Failed To register User"
      });
    } else {
      res.json(usr);
    }
  });
});

//Login
router.post('/login', function(req, res) {
  let username = req.body.username;
  password = req.body.password;

  User.getByUserName(username, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({
        success: "false",
        msg: "User not found"
      })
    }
    //if found compareUser to regiestred one
    User.comparePassword(password, user.password, function(err, isMatched) {
      if (err) {
        throw err;
      }
      if (isMatched) {
        const token = jwt.sign(user.toJSON(), CONFIG.secret, {expiresIn: 3600 /*Logout in 1 hour*/ });
        res.json({
          success: "true",
          token: "JWT " + token,
          user: user._id,
          email: user.email,
          username: user.username,
        });
      }
      else{
        return res.json({
          success: "false",
          msg: " Password not Matched"
        });
      }
    });
  });
});

//Logout
router.get("/logout", function(req, res) {
});

module.exports = router;
