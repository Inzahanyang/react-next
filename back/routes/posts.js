const express = require("express");
const { Post, User, Image, Comment } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Image },
        { model: User, attributes: ["id", "nickname"] },
        { model: User, as: "Likers", attributes: ["id"] },
        { model: Comment, include: [{ model: User, attributes: ["id", "nickname"] }], order: [["createdAt", "DESC"]] },
      ],
    });
    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
