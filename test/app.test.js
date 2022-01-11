const request = require('supertest');
const app = require('../app');
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

// Homepage test.
describe('Home page route exists.', () => {
  it("Server 'homepage' can be viewed just fine.", async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});

// JSON DATA TESTS
describe('Can get JSON data from specific routes.', () => {
  // Example of checking response body for keys, but not their values:
  it("The 'message' property exists and has data", async () => {
    const res = await request(app).get('/jsonResponseRoute');
    expect(res.body).toHaveProperty('message');
  });

  // Example of checking the response body for specific values:
  it("The 'message' property exists and says 'Hello world!'", async () => {
    const res = await request(app).get('/jsonResponseRoute');
    expect(res.body.message).toEqual('Hello world!');
  });
});

// POST REQUEST TESTS
describe('Route that returns a sum of numbers from a given array.', () => {
  it('Should return 55 when given an array of 1-10.', async () => {
    // Build & make the request:
    const res = await request(app)
      .post('/sumArrayOfNumbers')
      .send({
        submittedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });

    // Check the result of the request:
    expect(res.statusCode).toEqual(200);
    expect(res.body.sum).toEqual(55);
    done();
  });
});

afterAll(async done => {
  // Force our server reference to close:
  await server.close();

  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});
