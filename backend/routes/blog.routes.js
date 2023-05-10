const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blog.controller");
const {
  authAdminMiddleware,
} = require("../Middlewares/authentication.middleware");

const { requireSignin } = require("../controllers/authentication.controller");

router.post("/blog", requireSignin, authAdminMiddleware, createBlog);

module.exports = router;
