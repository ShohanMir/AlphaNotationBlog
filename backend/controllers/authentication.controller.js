const User = require("../models/user.model");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
//req.profile saved in auth middleware  the controller will give user info or user profile

exports.signup = (req, res) => {
  // console.log(req.body);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json({
        user: success,
      });
      // res.json({
      //   message: "Signup success! Please signin.",
      // });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with thais email does not exists.please Signup",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token, { expiresIn: "3d" });

    const { _id, username, name, email, role } = user;

    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});
