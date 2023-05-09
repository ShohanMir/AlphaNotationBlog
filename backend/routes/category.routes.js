const express = require("express");
const router = express.Router();
const {
  createCategory,
  allCategoryList,
  readOneCategory,
  removeCategory,
} = require("../controllers/categories.controller");

// validators
const { runValidation } = require("../validators/validator.index.js");
const { categoryCreateValidator } = require("../validators/category.validator");
const { requireSignin } = require("../controllers/authentication.controller");
const {
  authAdminMiddleware,
} = require("../Middlewares/authentication.middleware");

router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  authAdminMiddleware,
  createCategory
);
router.get("/categories", allCategoryList);
router.get("/category/:slug", readOneCategory);
router.delete(
  "/category/:slug",
  requireSignin,
  authAdminMiddleware,
  removeCategory
);

module.exports = router;
