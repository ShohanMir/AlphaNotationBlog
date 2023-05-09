const Category = require("../models/category.model.js");
const { json } = require("body-parser");
const slugify = require("slugify");

const { errorHandler } = require("../helpers/dbErrorHandler.js");
exports.createCategory = (req, res) => {
  const { categoryName } = req.body;
  const slug = slugify(categoryName).toLowerCase();

  let category = new Category({ categoryName, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: dbErrorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.allCategoryList = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      req.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.readOneCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      req.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(category);
  });
};

exports.removeCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOneAndRemove({ slug }).exec((err, category) => {
    if (err) {
      req.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "category deleted successfully",
    });
  });
};
