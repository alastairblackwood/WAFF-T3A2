const db = require('./db.js');
beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

// Describe block - place similar tests together - for async test call done at end
describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      }
    );
  });

  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDb.
    expect(savedUser._id);
  });

  it('First Test', async done => {
    const result = await numberFunc(10);
    expect(result.word).toBe('ten');
    expect(result.number).toBeGreaterThan(10);
    done();
  });
  it('Second Test', async done => {
    const result = await numberFunc();
    expect(result).toBeNull();
    done();
  });
});
