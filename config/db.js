const mysql = require("mysql");

//localhost database

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "naniz",
});

//aws database



db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected with database!");
  }
});
module.exports = db;
