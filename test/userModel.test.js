const User = require('../src/models/userModel');
const request = require('supertest');
const app = require('../app');
const server = require('../server');
const { fakeUserData } = require('../test/testData');
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require('../src/utils/test-utils/validators.utils');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// init empty, assign later
var dbConnectionTest;
var mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  dbConnectionTest = await mongoose.connect(mongoServer.getUri(), mongooseOpts);
});

describe('User Model Test Suite', () => {
  test('should validate saving a new user successfully', async () => {
    const validUser = new User({
      local: fakeUserData,
      role: fakeUserData.role,
    });
    const savedUser = await validUser.save();

    validateNotEmpty(savedUser);

    validateStringEquality(savedUser.role, fakeUserData.role);
    validateStringEquality(savedUser.local.email, fakeUserData.email);
    validateStringEquality(savedUser.local.password, fakeUserData.password);
    validateStringEquality(savedUser.local.name, fakeUserData.name);
  });

  test('should validate MongoError duplicate error with code 11000', async () => {
    expect.assertions(4);
    const validUser = new User({
      local: fakeUserData,
      role: fakeUserData.role,
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });
});

afterAll(async done => {
  if (dbConnectionTest) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
    await mongoServer.stop();
  }
  // Force our server reference to close:
  await server.close();

  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});
