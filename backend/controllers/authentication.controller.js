const User = require('../models/user.model');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
//req.profile saved in auth middleware  the controller will give user info or user profile

async function signup(req, res) {
  // console.log(req.body);
  const { name, email: signupEmail, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: signupEmail });
    if (existingUser) {
      return res.status(400).json({
        error: 'The Email is already taken',
      });
    }

    const username = shortId.generate();
    const profile = `${process.env.CLIENT_URL}/profile/${username}`;

    const newUser = new User({
      name,
      email: signupEmail,
      password,
      profile,
      username,
    });
    const savedUser = await newUser.save();

    res.json({
      message: 'Signup success! Please signin',
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: 'Something went wrong, please try again later',
    });
  }
}

async function signin(req, res) {
  const { email: signinEmail, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: signinEmail });

    if (!existingUser) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      });
    }

    // authenticate
    const isAuthenticated = await existingUser.authenticate(password);
    if (!isAuthenticated) {
      return res.status(400).json({
        error: 'Email and password do not match.',
      });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('token', token, { expiresIn: '1d' });
    const { _id, username, name, email, role } = existingUser;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: 'Something went wrong, please try again later',
    });
  }
}

// signout
const signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Signingout success',
  });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

module.exports = {
  signup,
  signin,
  signout,
  requireSignin,
};
