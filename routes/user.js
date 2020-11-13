//All backend related to Users
//Basic NodejS setup
const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../config/db.js");

const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();

//For Encryption
const bcrypt = require("bcryptjs");

//To Check if user already exists
const checkIfUserExists = require("./middleware/registerMiddleware");
const checkIfRegister = require("./middleware/loginMiddleware");
//Handle Registering Users
//POST user/signup
router.post("/signup", checkIfUserExists, async (req, res) => {
  var today = new Date();

  var production;
  if (req.body.production) {
    production = true;
  } else {
    production = false;
  }
  var users = {
    username: req.body.username,
    name: req.body.firstname,
    address: req.body.address,
    password: req.body.password,
    production: production,
  };

  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(req.body.password, salt);
  msg = "";
  {
    await db.query("INSERT INTO users SET ?", users, function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        res.send("USER NOT REGISTERED");
      } else {
        msg = "USER REGISTERED PLEASE LOGIN";
        var fail = true;
        res.render("index", {
          msg: ["USER REGISTERED PLEASE LOGIN"],
          fail: fail,
          display1: "block",
          display2: "none",
          logged: req.session.admin,
        });
      }
    });
  }
});

router.get("/login", function (req, res) {
  res.render("user/login", {
    logged: req.session.admin,
  });
});

router.get("/signup", function (req, res) {
  res.render("user/signup", {
    msg: null,
    logged: req.session.admin,
  });
});

//Handle POST user Login
router.post("/login", checkIfRegister, async (req, res) => {
  await db.query(
    "SELECT * FROM users WHERE Username = ?",
    req.body.username,
    async (error, result, fields) => {
      var isMatch = await bcrypt.compare(req.body.password, result[0].Password);
      if (isMatch) {
        isLogged = true;
        userName = result[0].Name;
        req.session.user = result[0].Name;
        req.session.admin = true;

        console.log(result);
        res.redirect("/");
      } else {
        var msg = ["Wrong Credentials"];
        res.render("user/login", {
          msg: msg,
          display1: "block",
          display2: "none",
          logged: req.session.admin,
        });
      }
    }
  );
});

router.get("/logout", function (req, res) {
  req.session.admin = false;
  res.redirect("/");
});
module.exports = router;

// var isMatch = await bcrypt.compare(password, user.password);
