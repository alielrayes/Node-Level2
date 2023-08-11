const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var {requireAuth} = require("../middleware/middleware");
const {checkIfUser} = require("../middleware/middleware")



router.get("*",checkIfUser)



// Level 2

router.get("/signout",  (req, res) => {
  res.cookie("jwt", "", {  maxAge: 1 });
  res.redirect("/")
});



router.get("/",  (req, res) => {
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const result = await AuthUser.create(req.body);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  console.log("__________________________________________");

  const loginUser = await AuthUser.findOne({ email: req.body.email });

  if (loginUser == null) {
    console.log("this email not found in DATABASE");
  } else {
    const match = await bcrypt.compare(req.body.password, loginUser.password);
    if (match) {
      console.log("correct email & password");
      var token = jwt.sign({ id: loginUser._id }, "c4a.dev");
      console.log(token);

      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.redirect("/home");
    } else {
      console.log("wrong password");
    }
  }
});

// Level 1
// GET Requst
router.get("/home", requireAuth, userController.user_index_get);

router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.get("/view/:id", requireAuth, userController.user_view_get);

router.post("/search", userController.user_search_post);

// DELETE Request
router.delete("/edit/:id", userController.user_delete);

// PUT Requst
router.put("/edit/:id", userController.user_put);

module.exports = router;
