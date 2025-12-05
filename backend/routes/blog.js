const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(posts);
});
router.get("/:id", async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if(!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
});
module.exports = router;
