import createTestServer from '../utils/test.server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
require('dotenv').config();

function generateToken(email: string): string {
    return jwt.sign({ email: email }, `${process.env.SECRET}`);
}

const app = createTestServer();

const token = generateToken('anast.bouby@gmail.com');

describe('Service', () => {
    describe('setNewToken', () => {
        it('set new token with a bad email adress', async () => {
            await supertest(app)
                .post('/api/setNewToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'test123@gmail.com',
                    token: '',
                    service: 'spotify_token',
                })
                .expect(400);
        });

        it('set new token with a bad service', async () => {
            await supertest(app)
                .post('/api/setNewToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'test@gmail.com',
                    token: '',
                    service: 'test_token',
                })
                .expect(400);
        });

        it('set new token successfuly', async () => {
            await supertest(app)
                .post('/api/setNewToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'test@gmail.com',
                    token: '',
                    service: 'spotify_token',
                })
                .expect(201);
        });
    });

    describe('setNewUser', () => {
        it('set new user with an email that already exist', async () => {
            await supertest(app)
                .post('/api/setNewUser')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'test@gmail.com',
                })
                .expect(409);
        });
    });

    describe('getToken', () => {
        it('get token with a invalid email', async () => {
            await supertest(app)
                .post('/api/getToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'test123@gmail.com',
                })
                .expect(400);
        });
        it('get token with a valid email', async () => {
            await supertest(app)
                .post('/api/getToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    user_email: 'test@gmail.com',
                })
                .expect(200);
        });
    });
});
