import supertest from 'supertest';
import createTestServer from '../utils/test.server';
const jwt = require('jsonwebtoken');

function generateToken(email: string): string {
    return jwt.sign({ email: email }, process.env.SECRET);
}

const app = createTestServer();

describe('Auth', () => {
    describe('Login', () => {
        it('Login user with missing informations', async () => {
            await supertest(app).post('/api/login').expect(400);
        });

        it('Login user with wrong informations', async () => {
            await supertest(app)
                .post('/api/login')
                .send({ email: 'anast.bouby@icloud.com', password: '123abc' })
                .expect(401);
        });

        it('Login user with good informations', async () => {
            await supertest(app)
                .post('/api/login')
                .send({
                    email: 'anast.bouby@icloud.com',
                    password: 'Japonnihon31',
                })
                .expect(200);
        });
    });

    describe('Register', () => {
        it('Register with an empty field', async () => {
            await supertest(app)
                .post('/api/register')
                .send({
                    name: '',
                    surname: '',
                    username: '',
                    email: '',
                    password: '',
                })
                .expect(400);
        });

        it('Register with any field', async () => {
            await supertest(app).post('/api/register').expect(400);
        });

        it('Register with an already use field', async () => {
            await supertest(app)
                .post('/api/register')
                .send({
                    name: 'Anastasia',
                    surname: 'Bouby',
                    username: 'Lxnairx',
                    email: 'anast.bouby@icloud.com',
                    password: 'Japonnihon31',
                })
                .expect(409);
        });
    });

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
});
