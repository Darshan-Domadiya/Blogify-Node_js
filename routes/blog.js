const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/add-new", (req, res, next) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    return cb(null, fileName);
  },
});

const upload = multer({ storage });   


router.post("/", upload.single("coverImage"), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  next();
  return res.redirect("/");
});

module.exports = router;
