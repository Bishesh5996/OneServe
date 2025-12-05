const mongoose = require("mongoose");
const MenuItemSchema = new mongoose.Schema({
  title: String,
  price: String,
  category: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("MenuItem", MenuItemSchema);
