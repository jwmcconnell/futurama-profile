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
