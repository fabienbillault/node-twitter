const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({
  content: {
    type: String,
    minlength: [3, 'Le tweet est trop court'],
    maxlength: [140, 'Le tweet est trop long'],
    required: [true, 'Le champ est obligatoire'],
  },
  author: { type: schema.Types.ObjectId, red: 'user' },
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;
