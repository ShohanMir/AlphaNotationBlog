const Blog = require("../models/blog.model");
const formidable = require("formidable");
const slugify = require("slugify");

const stripHtml = require("string-strip-html");
const _ = require("lodash");
const Category = require("../models/category.model");
const Tag = require("../models/tag.model");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  //jpeg,pns......etc
  form.keepExtensions = true;
  //we need to parse the form data to js object
  form.parse(req, (fields, files, err) => {
    if (err) {
      res.status(400).json({
        error: "error err rerr",
      });
    }
    const { title, body, categories, tags } = fields;
    if (!title || !title.length) {
      return res.status(400).json({
        error: "title is required",
      });
    }
    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short",
      });
    }
    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }
    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    let blog = new Blog();
    (blog.title = title),
      (blog.body = body),
      (blog.categories = categories),
      (blog.slug = slugify(title).toLowerCase()),
      (blog.mtitle = `${title} | ${process.env.APP_NAME}`);
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less then Imb in size",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }
    blog.save((err, result) => {
      if (err) {
        res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
