const { getTweet } = require('./dataHelpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Error and Not Found Middleware', () => {
  it('returns a 404 Not Found error for any undefined path', () => {
    return request(app)
      .get('/notARoute')
      .then(res => {
        expect(res.body).toEqual({
          'error': {
            'status': 404
          },
          'message': 'Not Found'
        });
      });
  });
});

describe('GET profiles', () => {
  it('returns all profiles on the db', () => {
    return request(app)
      .get('/api/v1/profiles')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          favoriteCharacter: expect.any(String),
          tagline: expect.any(String),
          __v: 0
        });
        expect(res.status).toEqual(200);
      });
  });
});
