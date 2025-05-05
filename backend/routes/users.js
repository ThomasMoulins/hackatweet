var express = require("express");
const User = require("../models/users");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const Tweet = require("../models/tweets");

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
          likedTweets: []
        });

        newUser.save().then((newDoc) => {
          res.json({ result: true, token: newDoc.token, firstname: newDoc.firstname, username: newDoc.username});
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
          likedTweets: data.likedTweets,
        });
      } else {
        res.json({ result: false, error: "User not found or wrong password" });
      }
    });
  } catch (e) {
    res.status(500).json({ result: false, error: e.message });
  }
});

router.put("/liked", async (req, res) => {
  if (!checkBody(req.body, ["tweetId", "token"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const tweetExist = await Tweet.findById(req.body.tweetId)

  if (!tweetExist) {
    return res
      .status(404)
      .json({ result: false, error: "Tweet not found" });
  }

  const removeId = await User.findOneAndUpdate({ token: req.body.token, likedTweets: req.body.tweetId },
    {$pull: { likedTweets: req.body.tweetId}}
  )
  
 if (removeId) {
  return res.json({ result: true})
 }

  const updateUser = await User.findOneAndUpdate(
    { token: req.body.token },
    { $addToSet: { likedTweets: req.body.tweetId } }
  );
  
  if (!updateUser) {
    return res.status(404).json({ result: false, error: "User not found" });
  }
  return res.json({ result: true});
});


module.exports = router;
