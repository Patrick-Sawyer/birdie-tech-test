import app from '../src/application'
import * as request from 'supertest';

describe('We are grateful to you for doing this it.', () => {
  it('thanks you', async () => {
    await request(app)
      .get('/observations')
      .expect(200)
  })
});
