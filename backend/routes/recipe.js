const express = require('express'),
  router = express.Router()
Recipe = require('../models/recipe');



router.get('/', function(req, res) {
  Recipe.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});
router.get('/home', function(req, res) {
  Recipe.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

//Create A new Recipe Item
router.get("/home/new", function(req, res) {

  res.send("Recipe Create New");
});
router.post("/home/new", function(req, res) {
  //let ingredient = req.body.ingredient.map(ingredient => ingredient);
  let ingredient =req.body.ingredients.split(",").map(ingredient => ingredient);


  let title = req.body.name,
    desc = req.body.description
    img = req.body.image,


    console.log(ingredient);

  Recipe.create({
    name: title,
    description: desc,
    image: img,
    ingredients: ingredient
  }, function(err, newRecipe) {
    if (err) {
      return handleError(err);
    } else {
      res.json({newRecipe})
    }

  });
});
//Recipe Detail
router.get("/home/:id/details", function(req, res) {
  res.send("Recipe Details");
});
//Edit Recipe
router.get("/home/:id/details/edit", function(req, res) {

  Recipe.findById(req.params.id, function(err, foundRecipe) {
    if (err) {
      return err;
    } else {
      res.json(foundRecipe)
    }

  });
});

//Update Recipe Post

router.put("/home/:id/details", function(req, res) {
  let ingredient = req.body.ingredient.map(ingredient => ingredient);
  let title = req.body.name,
    desc = req.body.description
  img = req.body.image;

  Recipe.findByIdAndUpdate(req.params.id, {
    name: title,
    description: desc,
    image: img,
    ingredients: ingredient

  }, function(err, foundRecipe) {
    if (err) {
      return err;
    } else {
      res.json(foundRecipe)

    }

  });
});

//Delte Recipe
router.delete("/home/:id/details", function(req, res) {
  Recipe.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "Deleted"
      })
    }

  });
});

module.exports = router;
