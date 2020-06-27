const express = require("express");
const app = express();
const cors = require("cors");
const log = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("DB connect success");
  })
  .catch(console.error);

dotenv.config();
passportConfig();

app.use(log("dev"));
app.use(cors({ origin: "http://localhost:3060", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("running server !!!");
});
