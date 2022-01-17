const request = require('supertest');
const http = require('http');
const { disconnectDb } = require('../../startup/db');

describe('auth middleware', () => {
  let server;

  beforeAll(done => {
    const app = require('../../app');
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll(done => {
    server.close(done);
    disconnectDb();
  });

  it('should return 401 if no token is provided', async () => {
    const res = request(server)
      .post('/api/genres')
      .set('x-auth-token', '')
      .send({ name: 'genre1' });
    expect(res.status).toBe(401);
  });
});
