const mongoose = require("mongoose");
const BlogCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("BlogCategory", BlogCategorySchema);
