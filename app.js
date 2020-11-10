const express = require("express");
const mysql = require("mysql");
const app = express();
const ejs = require("ejs");
const db = require("./config/db.js");
const socketio = require("socket.io");
const PORT = process.env.PORT;
const http = require("http");
const bodyParser = require("body-parser");

const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const server = http.createServer(app);
const io = socketio(server);
const upload = require("./routes/middleware/multerMiddleware");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ extended: false }));


app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
	secret: "2C44-4D44-WppQ38S",
	resave: true,
	saveUninitialized: true
}));

//render home.ejs with passing a variable
app.use(function(req, res, next){
  res.locals.currentUser = req.session.user;
  next();
});

app.get("/", async (req, res) => {
  var msg = null;
  if (req.session.admin) {
    msg = ["Logged In"];
  }
  res.render("Home", {
    msg: msg,
    display1: "none",
    display2: "none",
    logged: req.session.admin,
  });
});

app.use("/user", require("./routes/user"));
app.use("/add", require("./routes/addItems"));
app.use("/form", require("./routes/form"));
//app.use("/post", require("./routes/post"));

io.on("connection", function (socket) {
  socket.on("add", function () {
    io.emit("field");
  });
  socket.on("addItem", function () {
    io.emit("items");
  });
  console.log("Connected socket");
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The server has Started!");
});
