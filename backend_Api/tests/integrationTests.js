const request = require('supertest');
const app = require('../app');

describe('Talent API Endpoints', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  it('should fetch all talents', async () => {
    const res = await request(app)
      .get('/talent/getTalents')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should submit a talent requirement', async () => {
    const res = await request(app)
      .post('/scout/submitRequirements')
      .set('Authorization', `Bearer ${token}`)
      .send({
        scoutId: '12345',
        position: 'Striker',
        requirements: 'Must have good ball control',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Requirement posted successfully!');
  });
});