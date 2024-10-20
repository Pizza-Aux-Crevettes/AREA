import supertest from 'supertest';
import createTestServer from '../utils/test.server';
const jwt = require('jsonwebtoken');

function generateToken(email: string): string {
    return jwt.sign({ email: email }, process.env.SECRET);
}

const app = createTestServer();

describe('Users', () => {
    it('Token Empty', async () => {
        await supertest(app).get('/api/user/me').expect(401);
    });

    it('Valid Token', async () => {
        await supertest(app)
            .get('/api/user/me')
            .set(
                'Authorization',
                `Bearer ${generateToken('anast.bouby@icloud.com')}`
            )
            .expect(200);
    });

    it('Invalid Token', async () => {
        await supertest(app)
            .get('/api/user/me')
            .set('Authorization', `Bearer lol`)
            .expect(401);
    });
});
