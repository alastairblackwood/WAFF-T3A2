const db = require('./db');
beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());
const router = require('../routes/filmRoutes');

// test('invalid path should redirect to 404', async () => {
//  await request(app)
//  .get(filmController.getFilm)
//   );
// });
// .expect(409)

// describe('Restaurants created when', () => {

//   it('First restaurant', async done => {
//     const { restaurantId } = await createRestaurant("First", 'Sydney', '$')

//     // find the restaurant from the db
//     const restaurant = await Restaurant.findById(restaurantId)

//     // check the name, location etc of the new restaurant found
//     expect(restaurant.name).toEqual('First')
//     expect(restaurant.cost).toEqual('$')
//     expect(restaurant.location).toEqual('Sydney')
//     done()

//   })
