const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/authentication.controller");

// validators
const { runValidation } = require("../validators/validator.index.js");
const {
  userSignupValidator,
  userSignInValidator,
} = require("../validators/authentication.validator");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSignInValidator, runValidation, signin);
router.get("/signout", signout);
// test
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
