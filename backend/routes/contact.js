const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  const c = new Contact({ name, email, phone, message });
  await c.save();
  res.json({ success: true, message: "Contact saved" });
});

module.exports = router;
