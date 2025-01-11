// userRoutes.test.ts
import request from 'supertest';
import express from 'express';
import userRoutes from './userRoutes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Routes', () => {
  it('POST /register should return user data', async () => {
    const response = await request(app).post('/api/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('POST /login should return a token', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
