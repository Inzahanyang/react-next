const express = require("express");
const app = express();

const post = require("./routes/post");

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("DB connect success");
  })
  .catch(console.error);

// get post put patch delete options head

app.get("/", (req, res) => {
  res.send("node hello");
});

app.get("/", (req, res) => {
  res.send("api hello");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", post);

app.listen(3065, () => {
  console.log("running server !!!");
});
