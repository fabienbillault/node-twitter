const {
  getTweet,
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
  getCurrentUserTweetsWithFollowing,
  getUserTweetsFromUsername
} = require('../queries/tweets.queries');

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);

    res.render('tweets/tweet', {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user,
      editable: true
    });
  } catch (e) {
    next(e);
  }
};

exports.tweetNew = (req, res, next) => {
  console.log({
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user
  });

  res.render('tweets/tweet-form', {
    tweet: {}, //Tweet vide pour éviter undefined
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
    user: req.user
  });
};

exports.tweetEdit = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await getTweet(tweetId);
    res.render('tweets/tweet-form', {
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user
    });
  } catch (e) {
    next(e);
  }
};

exports.tweetCreate = async (req, res, next) => {
  try {
    await createTweet({ ...req.body, author: req.user._id });
    res.redirect('/tweets');
  } catch (e) {
    const errors = Object.keys(e.errors).map(key => e.errors[key].message);
    res.status(400).render('tweets/tweet-form', {
      errors,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user
    });
  }
};

exports.tweetUpdate = async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = req.body;
    await updateTweet(tweetId, tweet);
    const tweets = await getTweets();
    res.redirect('/tweets');
  } catch (e) {
    const errors = Object.keys(e.errors).map(key => e.errors[key].message);
    const tweet = await getTweet(tweetId);
    res.status(400).render('tweets/tweet-form', { errors, tweet });
  }
};

exports.tweetDelete = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    await deleteTweet(tweetId);
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    res.render('tweets/tweet-list', {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      editable: true
    });
  } catch (e) {
    next(e);
  }
};
