const express = require("express");
const ejs = require("ejs");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const Blog = require("./models/blog");

const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const PORT = 8000;
const app = express();

const mongoose = require("mongoose");
const { nextTick } = require("process");
mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() => {
  console.log("MongoDB is connected!");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  console.log(allBlogs);

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
