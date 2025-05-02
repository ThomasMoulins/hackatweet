const tweetSchema = mongoose.Schema({
    text: String,
    hashtags: [String],
    date: Date,
    like: Boolean,
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   });
   
   const Tweet = mongoose.model('tweets', tweetSchema);