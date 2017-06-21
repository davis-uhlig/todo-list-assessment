const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

let toDo = [

];

let completedList = [];


app.get("/", function(req, res){
  res.render("index", {toDo: toDo, completedList: completedList});
});

app.post("/", function(req, res){
  if(req.body.newTodo){
  toDo.push(req.body.newTodo);
  res.redirect("/");
  }
  else {
    toDo.splice(toDo.indexOf(req.body.incomplete), 1);
    completedList.push(req.body.incomplete)
    res.redirect("/")
  }
});

// app.get("/", function(req, res){
//   res.render("index", {completedList: completedList});
// });
//
// app.post("/", function(req, res){
//   completedList.push(req.body.item)
//   res.redirect("/")
// });




app.listen(3000, function(){
  console.log("App is running on localhost:3000");
});
