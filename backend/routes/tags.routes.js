const express = require("express");
const router = express.Router();

// controllers
const { requireSignin } = require("../controllers/authentication.controller");

// validators
const { runValidation } = require("../validators/validator.index.js");
const { createTagValidator } = require("../validators/tag.validators");
const {
  authAdminMiddleware,
} = require("../Middlewares/authentication.middleware");
const {
  createTag,
  allTagList,
  readOneTag,
  removeTag,
} = require("../controllers/tag.controller");

// only difference is methods not name 'get' | 'post' | 'delete'
router.post(
  "/tag",
  createTagValidator,
  runValidation,
  requireSignin,
  authAdminMiddleware,
  createTag
);
router.get("/tags", allTagList);
router.get("/tag/:slug", readOneTag);
router.delete("/tag/:slug", requireSignin, authAdminMiddleware, removeTag);

module.exports = router;
