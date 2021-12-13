const db = require('./db')
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())
const router = require('../routes/filmRoutes');

test('invalid path should redirect to 404', async () => {
 await request(app)
 .get(filmController.getFilm)
  );
});
.expect(409)
