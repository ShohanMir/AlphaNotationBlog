//const Category = require("../models/category.model.js");
const { json } = require("body-parser");
const slugify = require("slugify");

exports.createCategory = (req, res) => {
  const { categoryName } = req.body;
  const slug = slugify(categoryName).toLowerCase();

  let category = new Category({ categoryName, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "error ",
      });
    }
    res.json(data);
  });
};
