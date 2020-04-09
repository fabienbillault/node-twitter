const { createUser } = require('../queries/users.queries');
const path = require('path');
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images/avatars'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

exports.signupForm = (req, res, next) => {
  res.render('users/user-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    req.login(user, (err) => {
      if (err) {
        next(err);
      }
    });
    res.redirect('/');
  } catch (err) {
    res.render('users/user-form', {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
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
    } catch (err) {}
  },
];
