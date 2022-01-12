const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

//dotenv config
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// connect to db
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

module.exports = server;

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log('💥 Process terminated!');
//   });
// });