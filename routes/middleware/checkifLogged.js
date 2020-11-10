const session = require("express-session");

const checkifLogged = (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("/user/login");
  } else {
    // console.log(req.session.user)
    next();
  }
};

module.exports = checkifLogged;
