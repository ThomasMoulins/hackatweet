var express = require('express');
var router = express.Router();
const User = require('../models/users');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt =require('bcrypt');

router.post('/', (req, res) => {
    User.findOne({ id: _id })
    .populate('users')
    .then(users => {
        const newTweet = new Tweet ({
        text: req.body.text,
        hashtags: [req.body.hashtags],
        date: new Date,
        like: false,
        users: {users}

    })
    })
    
})

module.exports = router;