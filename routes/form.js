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
const isLogged = require("./middleware/checkifLogged");
//For Encryption
const bcrypt = require("bcryptjs");

//To Check if user already exists
const checkIfUserExists = require("./middleware/registerMiddleware");
const checkIfRegister = require("./middleware/loginMiddleware");

// var isMatch = await bcrypt.compare(password, user.password);
var items;

//STOCK CODE
router.get("/stock", isLogged, async (req, res) => {
  await db.query("SELECT Item_Name FROM inventory_items", function (
    error,
    results,
    fields
  ) {
    items = results;
    res.render("stockform", { logged: req.session.admin, item: results });
  });
});

router.post("/stock", async (req, res) => {
  console.log(items[0].Item_Name);
  for (var i = 0; i < items.length; i++) {
    await db.query(
      "UPDATE inventory_items SET Main_Qty = ? WHERE Item_Name = ?",
      [req.body.item[i], items[i].Item_Name],
      function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          res.render("success", { logged: req.session.admin });
        }
      }
    );
  }
  res.render("success", { logged: req.session.admin });
});

//PRODUCTION FORM
router.get("/production", isLogged, async (req, res) => {
  res.render("productionform", { logged: req.session.admin });
});

router.post("/production", isLogged, async (req, res) => {
  var today = new Date();
  if (typeof req.body.dish == "object") {
    for (var i = 0; i < req.body.dish.length; i++) {
      var dish = {
        Item_Name: req.body.dish[i],
        Qty: req.body.qty[i],
        Kitchen: req.session.user,
        date: today,
      };
      await db.query("INSERT INTO production SET ?", dish, function (
        err,
        result,
        fields
      ) {
        if (err) {
          console.log(err);

          res.send("<h1>Check your entry</h1>");
        }
      });
    }
    res.render("success", { logged: req.session.admin });
  } else {
    {
      var dish = {
        Item_Name: req.body.dish,
        Qty: req.body.qty,
        Kitchen: req.session.user,
        date: today,
      };
      await db.query("INSERT INTO production SET ?", dish, function (
        err,
        result,
        fields
      ) {
        if (err) {
          console.log(err);

          res.send("<h1>Check your entry</h1>");
        }
      });
    }
    res.render("success", { logged: req.session.admin });
  }
});

//DISPATCH FORM CODE
router.get("/dispatch", isLogged, async (req, res) => {
  var kitchens;
  await db.query("SELECT Name from users", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      kitchens = result;
      console.log(result);
      res.render("dispatchedform", {
        logged: req.session.admin,
        kitchens: kitchens,
      });
    }
  });
  console.log(kitchens);
});

router.post("/dispatch", async (req, res) => {
  var today = new Date();

  console.log(req.body.kitchen);
  if (typeof req.body.dish == "object") {
    for (var i = 0; i < req.body.dish.length; i++) {
      var dish = {
        Item_Name: req.body.dish[i],
        Qty: req.body.qty[i],
        FromKitchen: req.session.user,
        ToKitchen: req.body.kitchen,
        date: today,
      };
      console.log(req.body.dish);
      await db.query("INSERT INTO dispatched SET ?", dish, function (
        err,
        result,
        fields
      ) {
        if (err) {
          console.log(err);

          res.send("<h1>Check your entry</h1>");
        }
      });
    }
    res.render("success", { logged: req.session.admin });
  } else {
    {
      var dish = {
        Item_Name: req.body.dish,
        Qty: req.body.qty,
        FromKitchen: req.session.user,
        ToKitchen: req.body.kitchen,
        date: today,
      };

      await db.query("INSERT INTO dispatched SET ?", dish, function (
        err,
        result,
        fields
      ) {
        if (err) {
          console.log(err);

          res.send("<h1>Check your entry</h1>");
        }
      });
    }
    res.render("success", { logged: req.session.admin });
  }
});

//ALL Received FORM DATA
router.get("/received", isLogged, async (req, res) => {
  var kitchens;
  await db.query("SELECT Name from users", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      kitchens = result;

      res.render("receivedform", {
        logged: req.session.admin,
        kitchens: kitchens,
      });
    }
  });
});

router.post("/received", async (req, res) => {
  var today = new Date();
  console.log(typeof req.body.dish);
  if (typeof req.body.dish == "object") {
    try {
      for (var i = 0; i < req.body.dish.length; i++) {
        var dish = {
          Item_Name: req.body.dish[i],
          Qty: req.body.qty[i],
          FromKitchen: req.body.kitchen,
          ByKitchen: req.session.user,
          date: today,
        };
        console.log(req.body.dish);
        await db.query("INSERT INTO received SET ?", dish, function (
          err,
          result,
          fields
        ) {
          if (err) {
            console.log(err);

            res.send("<h1>Check your entry</h1>");
          }
        });
      }
      res.render("success", { logged: req.session.admin });
    } catch (error) {
      console.log(error);
      res.send("<h1>Error Occured</h1>");
    }
  } else {
    {
      var dish = {
        Item_Name: req.body.dish,
        Qty: req.body.qty,
        FromKitchen: req.body.kitchen,
        ByKitchen: req.session.user,
        date: today,
      };
      try {
        await db.query("INSERT INTO received SET ?", dish, function (
          err,
          result,
          fields
        ) {
          if (err) {
            console.log(err);

            res.send("<h1>Check your entry</h1>");
          }
        });
        res.render("success", { logged: req.session.admin });
      } catch (error) {
        console.log(error);
        res.send("<h1>Error Occured</h1>");
      }
    }
  }
});
module.exports = router;
