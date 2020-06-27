const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("Sorry! email exist already");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("success");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send("logout success");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: parseInt(req.params.userId) } });
    if (!user) return res.status(401).send("Not exist user");
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  const user = await User.findOne({ where: { id: parseInt(req.params.userId) } });
  if (!user) return res.status(401).send("Not exist user");
  await user.removeFollowers(req.user.id);
  res.status(200).json({ UserId: parseInt(req.params.userId) });
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) return res.status(404).send("Not exist User");
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/followings", isLoggedIn, async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) return res.status(403).send("Not exist user");
  const followings = await user.getFollowings();
  res.status(200).json(followings);
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:userId/follower", isLoggedIn, async (req, res, next) => {
  const user = await User.findOne({ where: { id: parseInt(req.params.userId) } });
  if (!user) return res.status(401).send("Not exist user");
  await user.removeFollowings(req.user.id);
  res.status(200).json({ UserId: parseInt(req.params.userId) });
  try {
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
// get post put patch delete options head
