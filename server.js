const mongoose = require('mongoose');
const dotenv = require('dotenv');

//dotenv config
dotenv.config({ path: 'config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  ),
});

//Creating API for user
// app.use('/api/users', userRoutes);

// const importedUserRouting = require('./backend/users/userRoutes');
// app.use('/backend/users', importedUserRouting);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
