import supertest from 'supertest';
import createTestServer from '../utils/test.server';

const app = createTestServer();

describe('Google', () => {
    it('Google login', async () => {
        await supertest(app).get('/google/login').expect(302);
    });

    it('Google login with origin', async () => {
        await supertest(app)
            .get('/google/login')
            .set('referer', 'test')
            .expect(302);
    });
});

describe('Spotify', () => {
    it('Spotify login', async () => {
        await supertest(app).get('/spotify/login').expect(302);
    });
});
