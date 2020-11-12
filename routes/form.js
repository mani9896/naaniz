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
  await db.query("SELECT * FROM inventory_items", function (
    error,
    results,
    fields
  ) {
    // console.log(results)
    res.render("form/stockEntry", { logged: req.session.admin, item: results });
  });
});

router.get("/stock/:subcategory", isLogged, async (req, res) => {
  await db.query(
    "SELECT * FROM inventory_items WHERE Sub_Category = ? ",
    [req.params.subcategory],
    function (error, results) {
      // console.log(results);
      db.query("SELECT * FROM inventory_items", function (
        error,
        result,
        allSub
      ) {
        items = result;
        console.log(items);
        res.render("form/stockEntryForm", {
          logged: req.session.admin,
          item: results,
          allSub: allSub,
        });
      });
    }
  );
});

router.post("/stock", isLogged, async (req, res) => {
  for (var i = 0; i < req.body.item.length; i++) {
    //console.log(items[i].Item_Name);

    // console.log(items[i].Item_Name);
    if (!req.body.item[i]) {
      console.log("value Not updated");
    } else {
      console.log(req.body.item[i]);
      await db.query(
        "UPDATE inventory_items SET Main_Qty = ? WHERE Item_Name = ?",
        [req.body.item[i], items[i].Item_Name],
        function (err, result, fields) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }
  res.redirect("/form/stock");
});

//PRODUCTION FORM
router.get("/production", isLogged, async (req, res) => {
  res.render("form/productionEntry", { logged: req.session.admin });
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
      res.render("form/dispatchEntry", {
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
router.get("/receive", isLogged, async (req, res) => {
  var kitchens;
  await db.query("SELECT Name from users", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      kitchens = result;

      res.render("form/receiveEntry", {
        logged: req.session.admin,
        kitchens: kitchens,
      });
    }
  });
});

router.post("/receive", async (req, res) => {
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
