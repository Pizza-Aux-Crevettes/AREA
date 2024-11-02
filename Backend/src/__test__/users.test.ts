import supertest from 'supertest';
import createTestServer from '../utils/test.server';
import { setAdaptability } from '../routes/users/user.query';
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
});
describe('AdaptabilityUser', () => {
    it('Set adaptability with token Empty', async () => {
        await supertest(app).post('/api/setAdaptabilityUser').expect(401);
    });

    it('Set adaptability with valid Token', async () => {
        await supertest(app)
            .post('/api/setAdaptabilityUser')
            .set(
                'Authorization',
                `Bearer ${generateToken('anast.bouby@gmail.com')}`
            )
            .send({ token: generateToken('anast.bouby@gmail.com') })
            .expect(200);
    });
    it('Get adaptability with valid token', async () => {
        await supertest(app)
            .get('/api/getAdaptabilityUser')
            .set(
                'Authorization',
                `Bearer ${generateToken('anast.bouby@gmail.com')}`
            )
            .expect(200);
    });
    it('Get adaptability with innalid token', async () => {
        await supertest(app)
            .get('/api/getAdaptabilityUser')
            .set(
                'Authorization',
                `Bearer ${generateToken('noExist@gmail.com')}`
            )
            .expect(400);
    });
});
