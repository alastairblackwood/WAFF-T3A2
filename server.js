const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

//dotenv config
dotenv.config({ path: 'config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(con => {
    console.log(con.connections);
    console.log('DB connection successful!');
  });

// const firebaseAdmin = require('firebase-admin');
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(
//     JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
//   ),
// });

//Creating API for user
// app.use('/api/users', userRoutes);

// const importedUserRouting = require('./backend/users/userRoutes');
// app.use('/backend/users', importedUserRouting);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
