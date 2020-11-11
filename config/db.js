const mysql = require("mysql");

//localhost database

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "anshul",
//   database: "naniz",
//   dialect: "mysql"
// });

//aws database

const db = mysql.createConnection({
  host: "database-1.c1dhbv3ltu4l.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "anshul1610",
  database: "naniz",
  dialect: "mysql"
});


db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected with database!");
  }
});
module.exports = db;
