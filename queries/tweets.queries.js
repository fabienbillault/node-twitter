const Tweet = require('../database/models/tweet.model');

exports.getTweet = tweetId => {
  return Tweet.findById({ _id: tweetId }).exec();
};

exports.getTweets = () => {
  return Tweet.find({}).exec();
};

exports.createTweet = tweet => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
};

exports.updateTweet = (tweetId, tweet) => {
  return Tweet.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
};

exports.deleteTweet = tweetId => {
  return Tweet.findByIdAndDelete({ _id: tweetId });
};

exports.getCurrentUserTweetsWithFollowing = user => {
  return Tweet.find({ author: { $in: [...user.following, user._id] } })
    .populate('author')
    .exec();
};

exports.getUserTweetsFromAuthorId = authorId => {
  return Tweet.find({ author: authorId })
    .populate('author')
    .exec();
};
