const express = require('express'),
      router = express.Router(),
      passport = require('passport');
  User = require('../models/user');


//Registraion Route
router.get('/register', function(req, res) {
  res.send("This is register route");
});

router.post('/register', function(req, res) {
  let username= req.body.username,
      password= req.body.password;
  let newUser = new User({username:username});

   User.register(newUser, password, function(err, result){
        if(err){
          return  res.json(err);
        }
        res.json(result);
        console.log(result);
        /*
        passport.authenticate('local')(req, res, function() {
           res.redirect('/blogs');
         });
         */
   });
});

//Login

router.get('/login', function(req, res) {

});

//LOgin middleware
  var loginMiddleware = passport.authenticate("local", {

    successRedirect: '/',
    failureRedirect: '/login'
  });

  router.post('/login', loginMiddleware, function(req, res) {
      res.json({message:"User is logged in"});
  });

//Logout
router.get("/logout", function(req, res){

      req.logout();
      res.json({message:"Logged out"});
    });

module.exports = router;
