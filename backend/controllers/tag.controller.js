const Tag = require("../models/tag.model");
const Blog = require("../models/tag.model");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createTag = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  tag.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data); // dont do this res.json({ tag: data });
  });
};

exports.allTagList = (req, res) => {
  Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.readOneTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: "Tag not found",
      });
    }
    res.json(tag);
  });
};

exports.removeTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Tag deleted successfully",
    });
  });
};
