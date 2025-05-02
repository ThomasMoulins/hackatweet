const tweetSchema = mongoose.Schema({
    firstName: String,
    userName: String,
    text: String,
   });
   
   const Tweet = mongoose.model('tweets', tweetSchema);