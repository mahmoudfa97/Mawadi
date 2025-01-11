// translationRoutes.test.ts
import request from 'supertest';
import express from 'express';
import translationRoutes from './translationRoutes';

const app = express();
app.use(express.json());
app.use('/api', translationRoutes);

describe('Translation Routes', () => {
  it('POST /aboutus should return translations', async () => {
    const response = await request(app).post('/api/aboutus').send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('intro');
  });
});
