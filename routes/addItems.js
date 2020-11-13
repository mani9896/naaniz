const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../config/db.js");
const upload = require("./middleware/multerMiddleware");
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();
var msg = null;
const isLogged = require("./middleware/checkifLogged");
router.get("/inventory", isLogged, (req, res) => {
  res.render("upload/inventory", {
    // title: "Upload Inventory Excel sheet",
    msg: msg,
    display1: "none",
    display2: "none",
    logged: req.session.admin,
  });
});

router.post("/submit/inventory", upload.array("xcel"), async (req, res) => {
  console.log(req.files.length);
  const readXlsxFile = require("read-excel-file/node");

  await readXlsxFile(req.files[0].path).then(async (rows) => {
    await db.query("TRUNCATE TABLE inventory_items");
    for (var i = 1; i < rows.length; i++) {
      var item = {
        Main_Category: rows[i][0],
        Sub_Category: rows[i][1],
        Item_Name: rows[i][2],
        Unit_Name: rows[i][3],
        Main_Qty: rows[i][4],
        Measurable_Unit: rows[i][5],
        Sub_Units: rows[i][6],
        GST: rows[i][7],
        Purchase_Price: rows[i][8],
        Kitchen: req.session.user,
      };
      console.log("cgvh");
      await db.query("INSERT into inventory_items SET?", item, function (
        err,
        result,
        fields
      ) {
        if (err) {
          console.log(err);
        } else {
          console.log("done");
        }
      });
    }
  });
  res.render("success", { logged: req.session.admin });
});

// Handle recipe upload
router.post("/submit/recipe", upload.array("xcel"), async (req, res) => {
  console.log(req.files.length);
  const readXlsxFile = require("read-excel-file/node");
  await db.query("TRUNCATE TABLE receipe");
  await readXlsxFile(req.files[0].path).then(async (rows) => {
    for (var i = 1; i < rows.length; i++) {
      var item = {
        Product_Name: rows[i][0],
        Item_Name: rows[i][1],
        UOM: rows[i][2],

        Req_Qty: rows[i][3],
        Watage: rows[i][4],
        Yield: rows[i][5],
        Yield_UOM: rows[i][6],
        Type: rows[i][7],
        Kitchen: req.session.user,
      };
      console.log(item);
      await db.query("INSERT into receipe SET?", item, function (
        err,
        result,
        fields
      ) {
        if (err) {
          console.log(err);
          res.send("<h1>Failed</h1>");
        }
      });
    }
  });
  res.render("success", { logged: req.session.admin });
});

router.get("/recipe", isLogged, (req, res) => {
  res.render("upload/recipe", {
    title: "Upload Recipe Excel sheet",
    msg: msg,
    display1: "none",
    display2: "none",
    logged: req.session.admin,
  });
});
module.exports = router;
