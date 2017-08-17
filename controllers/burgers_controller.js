var express = require("express");
var path = require("path");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var burger = require("../models/burger.js");
var db = require(path.join(__dirname,"..","models"));
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data){
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  db.Burger.create({
    burger_name:req.body.name
  }).then(function(result){
    res.redirect("/");
  })
});

router.put("/:id", function(req, res) {
  db.Burger.update(
    {devoured:true},
    {where:
      {id:req.body.burger_id}
  }).then(function(result){
    res.redirect("/");
  })
});

// Export routes for server.js to use.
module.exports = router;
