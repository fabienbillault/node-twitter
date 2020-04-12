const {
  searchUsersPerUsername,
  createUser,
  findUserPerUsername,
  addUserIdToCurrentUserFollowing,
  removeUserIdToCurrentUserFollowing,
  findUserPerId
} = require('../queries/users.queries');
const { getUserTweetsFromAuthorId } = require('../queries/tweets.queries');
const path = require('path');
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images/avatars'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

exports.userList = async (req, res, next) => {
  const search = req.query.search;

  if (search) {
    try {
      const users = await searchUsersPerUsername(search);
      res.render('includes/search-menu', { users });
    } catch (err) {
      next(err);
    }
  }
};

exports.userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserPerUsername(username);
    const tweets = await getUserTweetsFromAuthorId(user._id);

    res.render('tweets/tweet', {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user,
      editable: false
    });
  } catch (err) {
    next(err);
  }
};

exports.signupForm = (req, res, next) => {
  res.render('users/user-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    req.login(user, err => {
      if (err) {
        next(err);
      }
    });
    res.redirect('/');
  } catch (err) {
    res.render('users/user-form', {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user
    });
  }
};

exports.uploadImage = [
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const user = req.user;
      user.avatar = path.join('/images/avatars/', req.file.filename);
      await user.save();
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
];

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      addUserIdToCurrentUserFollowing(req.user, userId),
      findUserPerId(userId)
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (err) {
    next(err);
  }
};

exports.unFollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      removeUserIdToCurrentUserFollowing(req.user, userId),
      findUserPerId(userId)
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (err) {
    next(err);
  }
};
