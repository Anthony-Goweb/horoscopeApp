const request = require('supertest');
const { app, server } = require('./app');


describe('GET /', () => {
    it('responds with instructions for using the API', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Hello, To get your Zodiac Sign');
    });
});

describe('GET /horoscope', () => {
    it('responds with a 400 error if no birthdate query parameter is provided', async () => {
        const response = await request(app).get('/horoscope');
        expect(response.status).toBe(400);
    });

    it('responds with a 400 error if an invalid birthdate format is provided', async () => {
        const response = await request(app).get('/horoscope?birthdate=2024-13-45');
        expect(response.status).toBe(400);
      });

      it('responds with a 400 error if an invalid birthdate content is provided', async () => {
        const response = await request(app).get('/horoscope?birthdate=2024-02-30');
        expect(response.status).toBe(400);
      });

   

    it('responds with the correct zodiac sign if a valid birthdate is provided', async () => {
        const response = await request(app).get('/horoscope?birthdate=1990-05-25');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Great Your zodiac sign is');
    });
});

afterAll(done => {
    // Close the server after all tests are completed
    server.close(done);
});