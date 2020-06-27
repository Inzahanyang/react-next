const express = require("express");
const router = express.Router();

const { Post, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const user = require("../models/user");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        { model: Comment, include: [{ model: User, attributes: ["id", "nickname"] }] },
        { model: User, attributes: ["id", "nickname"] },
        { model: User, as: "Likers", attributes: ["id"] },
      ],
    });
    res.status(201).send(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) return res.status(403).send("Not exist post");
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ["id", "nickname"] }],
    });
    res.status(201).send(fullComment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) return res.status(403).send("There is no post");
    await post.addLikers(req.user.id);
    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) return res.status(403).send("There is no post");
    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.postId, UserId: req.user.id } });
    console.log(typeof req.params.postId);
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
