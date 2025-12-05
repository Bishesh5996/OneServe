const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  body: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("BlogPost", BlogSchema);
