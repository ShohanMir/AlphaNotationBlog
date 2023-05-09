const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Category", CategorySchema);
