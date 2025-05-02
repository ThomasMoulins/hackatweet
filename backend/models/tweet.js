const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    text: String,
    hashtags: [String],
    date: Date,
    like: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   });
   
   const Tweet = mongoose.model('tweets', tweetSchema);

   module.exports = Tweet