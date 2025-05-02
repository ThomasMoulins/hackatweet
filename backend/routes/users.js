var express = require("express");
const User = require("../models/users");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* ------ User Sign Up ------ */
router.post("/signup", (req, res) => {
  try {
    if (!checkBody(req.body, ["firstname", "username", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }

    // Check if the user has not already been registered
    User.findOne({ username: req.body.username }).then((data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
          firstname: req.body.firstname,
          username: req.body.username,
          password: hash,
          token: uid2(32),
        });

        newUser.save().then((newDoc) => {
          res.json({ result: true, token: newDoc.token });
        });
      } else {
        // User already exists in database
        res.json({ result: false, error: "User already exists" });
      }
    });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

/* ------ User Sign In ------ */
router.post("/signin", (req, res) => {
  try {
    if (!checkBody(req.body, ["username", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }

    User.findOne({ username: req.body.username }).then((data) => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({
          result: true,
          token: data.token,
          firstname: data.firstname,
        });
      } else {
        res.json({ result: false, error: "User not found or wrong password" });
      }
    });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

module.exports = router;
