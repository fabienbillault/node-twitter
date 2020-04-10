const mongoose = require('mongoose');
const env = require(`../environment/${process.env.NODE_ENV}.js`);

mongoose
  .connect(env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connexion DB Ok');
  })
  .catch((err) => {
    console.log(err);
  });
