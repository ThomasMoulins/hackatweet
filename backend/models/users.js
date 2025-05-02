const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 fristName: String,
 userName: String,
 password: String,
 tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'tweets' },
});

const User = mongoose.model('users', userSchema);

module.exports = User;