const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    trim: true,
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategory",
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // ratings:{
  //     type:Number,
  //     default:0
  // },
});
BlogSchema.set("toJSON", {
  transform: function (doc, ret) {
    const date = new Date(ret.createdAt);
    ret.createdAtFormatted = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year:"numeric"
      
    });
    return ret;
  },
});


module.exports = mongoose.model("Blog", BlogSchema);
