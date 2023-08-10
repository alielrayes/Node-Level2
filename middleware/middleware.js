
var jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  console.log("before run the function");
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "c4a.dev", (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};





module.exports = requireAuth
















