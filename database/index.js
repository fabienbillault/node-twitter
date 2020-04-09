const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://admin:250789@cluster0-2btph.gcp.mongodb.net/twitter?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log('Connexion DB Ok');
  })
  .catch((err) => {
    console.log(err);
  });
