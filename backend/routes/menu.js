const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await MenuItem.find().sort({ createdAt: -1 });
  res.json(items);
});
router.get("/:id", async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if(!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});
module.exports = router;
