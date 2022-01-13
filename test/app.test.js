const request = require('supertest');
const server = require('../server');
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

// Homepage test.
describe('Home page route exists.', () => {
  it("Server 'homepage' can be viewed just fine.", async done => {
    const res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
    done();
  });
});

// JSON DATA TESTS
describe('Can get JSON data from specific routes.', () => {
  // Example of checking response body for keys, but not their values:
  it("The 'message' property exists and has data", async done => {
    const res = await request(server).get('/jsonResponseRoute');
    expect(res.body).toHaveProperty('message');
  });

  // Example of checking the response body for specific values:
  it("The 'message' property exists and says 'Hello world!'", async done => {
    const res = await request(server).get('/jsonResponseRoute');
    expect(res.body.message).toEqual('Hello world!');
  });
});

// POST REQUEST TESTS
describe('Route that returns a sum of numbers from a given array.', done => {
  it('Should return 55 when given an array of 1-10.', async () => {
    // Build & make the request:
    const res = await request(server)
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
