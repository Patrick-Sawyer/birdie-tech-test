/// <reference types="jest" />

import app from '../src/application'
import * as request from 'supertest';

const recipientId = 'df50cac5-293c-490d-a06c-ee26796f850d';

describe('Observations endpoint', () => {

  it('returns status code 200', async () => {
    await request(app)
      .get('/observations')
      .expect(200)
  });

  describe('when only recipient id given', async () => {

    it('returns status code 200', async () => {
        await request(app)
          .get('/observations?recipient=' + recipientId)
          .expect(200)
    });

    it('returns array', async () => {
        const res: any = await request(app)
          .get('/observations?recipient=' + recipientId)
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('first 5 objects in array have valid timestamps strings', async () => {
        const res: any = await request(app)
          .get('/observations?recipient=' + recipientId)
        for(let i = 0; i < 5; i++){
            expect(typeof res.body[i].timestamp).toBe('string');
            let date = new Date(res.body[i].timestamp);
            expect(date.toString()).not.toBe('Invalid Date');
        }
    });
  })

  describe('when count given as true', async () => {

  })

  describe('when page given', async () => {

  })

  describe('when type given', async () => {

  })
});
