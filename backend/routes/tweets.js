var express = require("express");
var router = express.Router();
const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

/* ------ Post Tweet ------ */
router.post("/", (req, res) => {
  try {
    if (!checkBody(req.body, ["text", "username", "hashtags"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
    User.findOne({ username: req.body.username }).then((user) => {
      const newTweet = new Tweet({
        text: req.body.text,
        hashtags: req.body.hashtags,
        date: new Date(),
        like: 0,
        user: user._id,
      });

      newTweet.save().then((newDoc) => {
        res.json({ result: true, tweet: newDoc.text });
      });
    });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

/* ------ Get all Tweets ------ */
router.get("/", (req, res) => {
  try {
    Tweet.find()
      .sort({ date: -1 })
      .populate("user", "firstname username -_id")
      .then((tweets) => {
        res.json({ result: true, tweets: tweets });
      });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});


module.exports = router;
