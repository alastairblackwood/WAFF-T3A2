const mongoose = require('mongoose');
// const MongoMemoryServer = require('mongodb-memory-server');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = await MongoMemoryServer.create();

// exports.dbConnect = async () => {
const dbConnect = async () => {
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
};

// exports.dbDisconnect = async () => {
const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
  await mongoServer.stop();
};

module.exports = {
  dbConnect,
  dbDisconnect,
};
