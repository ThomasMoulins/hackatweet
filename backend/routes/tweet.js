var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Tweet = require('../models/tweet');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');

router.post('/', (req, res) => {
    if (!checkBody(req.body, ['text', 'username', 'hashtags'])) {
        res.json({ result: false, error: 'Missing or empty fields' })
        return;
    }
        User.findOne({username: req.body.username})
            .then(user => {
                const newTweet = new Tweet ({
                text: req.body.text,
                hashtags: [req.body.hashtags],
                date: new Date,
                like: 0,
                user: user._id
            });

            newTweet.save().then(newDoc => {
                res.json({ result: true, tweet: newDoc.text})
              });
            })
})

router.get

module.exports = router;