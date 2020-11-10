const bodyParser = require("body-parser");
const db = require("../../config/db.js");

const checkIfUserExists = async (req, res, next) => {
  var fail = false;
  var msg = [];
  await db.query(
    "SELECT * FROM users WHERE Username = ?",
    req.body.username,
    function (error, results, fields) {
      if (results.length > 0) {
        msg.push("USER ALREADY");
        ifUserfound = true;
      }
      db.query("SELECT * FROM users WHERE Username = ?", req.body.username, function (
        error,
        results,
        fields
      ) {
        if (results.length > 0) {
          msg.push("ALREADY HERE");
          res.render("Home", {
            msg: msg,
            fail: fail,
            display1: "none",
            display2: "block",
            logged: false,
          });
          ifUserfound = true;
        } else {
          next();
        }
      });
    }
  );
};

module.exports = checkIfUserExists;
