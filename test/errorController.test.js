const errorController = require('../src/controllers/errorController');
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

test('should throw an error if called without an arg', () => {
  expect(errorController).toThrow('You must provide a number');
});

test('should throw an error if called without a number', () => {
  expect(() => {
    errorController('45');
  }).toThrow('You must provide a number');
  done();
});

afterAll(async done => {
  // Force our server reference to close:
  await server.close();

  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});

//   it('should create new user', () => {
//     expect();
//   });
// });

// Callbacks

// test('the data is peanut butter', done => {
// function callback(data) {
//   try {
//     expect(data).toBe('peanut butter');
//     done();
//   } catch (error) {
//     done(error);
//   }
// }

// fetchData(callback);
// });

//

// Promises

// test('the data is peanut butter', () => {
//   return fetchData().then(data => {
//     expect(data).toBe('peanut butter');
//   });
// });

// ** IF YOU EXPECT PROMISE TO BE REJECTED INCLUDE CATCH METHOD

// test('the fetch fails with an error', () => {
//   expect.assertions(1);
//   return fetchData().catch(e => expect(e).toMatch('error'));
// });

// ASYNC AWAIT TESTS

// test('the data is peanut butter', async () => {
//   const data = await fetchData();
//   expect(data).toBe('peanut butter');
// });

// test('the fetch fails with an error', async () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// })
