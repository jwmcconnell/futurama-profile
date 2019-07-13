const { getProfile } = require('./dataHelpers');
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

  it('returns a profile by id', async() => {
    const { _id } = await getProfile();
    return request(app)
      .get(`/api/v1/profiles/${_id}`)
      .then(res => {
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
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

describe('POST profiles', () => {
  it('returns a profile and creates it in the db', () => {
    return request(app)
      .post('/api/v1/profiles')
      .send({ name: 'Jack', favoriteCharacter: 'Bender' })
      .then(res => {
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          favoriteCharacter: expect.any(String),
          tagline: expect.any(String),
          __v: 0
        });
        expect(res.status).toEqual(200);
      });
  });

  it('returns an error if no name is provided', () => {
    return request(app)
      .post('/api/v1/profiles')
      .send({ name: '', favoriteCharacter: 'Bender' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Please provide a name for your profile');
      });
  });
});
