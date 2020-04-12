const User = require('../database/models/user.model');

exports.searchUsersPerUsername = search => {
  const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
  console.log({ search, safeSearch });

  const regExp = `^${safeSearch}`;
  const reg = new RegExp(regExp, 'i');
  return User.find({ username: { $regex: reg } }).exec();
};

exports.createUser = async user => {
  try {
    const hashedPaswword = await User.hashPassword(user.password);

    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPaswword
      }
    });

    return newUser.save();
  } catch (err) {
    throw err;
  }
};

exports.findUserPerId = userId => {
  return User.findById(userId).exec();
};

exports.findUserPerEmail = email => {
  return User.findOne({ 'local.email': email }).exec();
};

exports.findUserPerUsername = username => {
  return User.findOne({ username }).exec();
};

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
  return User.updateOne({ _id: currentUser._id }, { $push: { following: userId } });
};

exports.removeUserIdToCurrentUserFollowing = (currentUser, userId) => {
  return User.updateOne({ _id: currentUser._id }, { $pull: { following: userId } });
};
