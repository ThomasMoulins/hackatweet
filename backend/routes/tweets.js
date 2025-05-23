var express = require("express");
var router = express.Router();
const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

/* ------ Post Tweet ------ */
router.post("/", (req, res) => {
  try {
    if (!checkBody(req.body, ["text", "username"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }

    const regex = /#([\p{L}\p{N}_]+)/gu;
    const hashtags = Array.from(req.body.text.matchAll(regex), (m) => m[1]);

    User.findOne({ username: req.body.username }).then((user) => {
      const newTweet = new Tweet({
        text: req.body.text,
        hashtags: hashtags,
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

/* ------ Delete Tweet ------ */
router.delete("/:id", async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { token } = req.body;

    if (!checkBody(req.body, ["token"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ result: false, error: "Tweet not found" });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ result: false, error: "Invalid Token" });
    }

    if (tweet.user.toString() !== user._id.toString()) {
      return res.status(403).json({ result: false, error: "Access denied" });
    }

    await Tweet.deleteOne({ _id: tweetId });
    return res.json({ result: true });
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

/* ------ Get tweets by hashtag ------ */
router.get("/hashtags/:hashtag", (req, res) => {
  try {
    Tweet.find({ hashtags: req.params.hashtag })
      .sort({ date: -1 })
      .populate("user", "firstname username -_id")
      .then((tweets) => {
        res.json({ result: true, tweets: tweets });
      });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

/* ------ Get all Hashtags ------ */
router.get("/hashtags", async (req, res) => {
  try {
    const hashtags = await Tweet.aggregate([
      { $unwind: "$hashtags" },
      {
        $group: {
          _id: "$hashtags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
      { $sort: { count: -1, name: 1 } },
    ]);

    return res.json({ result: true, hashtags });
  } catch (e) {
    return res.status(500).json({ result: false, error: e.message });
  }
});

router.put('/liked', async (req, res) => {
  if (!checkBody(req.body, ["tweetId", "number"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const setLiked = await Tweet.findByIdAndUpdate(
    req.body.tweetId,
    {$inc: { like: req.body.number} } 
  )
  if (setLiked) {
    return res.json({ result: true })
  }
})

module.exports = router;
