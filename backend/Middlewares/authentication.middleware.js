const User = require("../models/user.model");

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.authAdminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    if (user.role !== 1) {
      res.status(400).json({
        error: "Admin resource . Access Denied",
      });
    }
    req.profile = user;
    next();
  });
};
