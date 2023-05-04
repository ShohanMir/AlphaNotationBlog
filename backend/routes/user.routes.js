const express = require("express");
const router = express.Router();
const { requireSignin } = require("../controllers/authentication.controller");
const { authMiddleware } = require("../Middlewares/authentication.middleware");
const { read } = require("../controllers/user.controller");

router.get("/profile", requireSignin, authMiddleware, read);

module.exports = router;
