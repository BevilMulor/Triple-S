const request = require('supertest');
const app = require('../app');

describe('Performance Tests', () => {
  it('should measure the response time of fetching all talents', async () => {
    const start = Date.now();
    const res = await request(app).get('/talent/getTalents');
    const duration = Date.now() - start;
    console.log(`Response time: ${duration}ms`);
    expect(res.statusCode).toEqual(200);
    expect(duration).toBeLessThan(500); // Ensure the response time is less than 500ms
  });
});