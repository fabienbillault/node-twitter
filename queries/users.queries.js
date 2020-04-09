const User = require('../database/models/user.model');

exports.createUser = async (user) => {
  try {
    const hashedPaswword = await User.hashPassword(user.password);

    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPaswword,
      },
    });

    return newUser.save();
  } catch (err) {
    throw err;
  }
};

exports.findUserPerId = (userId) => {
  return User.findById(userId).exec();
};

exports.findUserPerEmail = (email) => {
  return User.findOne({ 'local.email': email }).exec();
};
