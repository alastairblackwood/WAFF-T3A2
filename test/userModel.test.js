const User = require('../src/models/userModel');
const { fakeUserData } = require('../test/testData');
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require('../src/utils/test-utils/validators.utils');
const {
  dbConnect,
  dbDisconnect,
} = require('../src/utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

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
