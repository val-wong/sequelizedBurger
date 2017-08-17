var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var db = require(path.join(__dirname,"models"));

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var routes = require(path.join(__dirname,"controllers","burgers_controller.js"));
// Import routes and give the server access to them.

app.use("/", routes);

db.sequelize.sync().then(function(){
  app.listen(port, function(){
    console.log("listening on " + port);
  });
})
