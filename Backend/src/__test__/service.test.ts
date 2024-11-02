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
    describe('SetNewToken', () => {
        it('Set new token with a bad email address', async () => {
            await supertest(app)
                .post('/api/setNewToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'notExist@gmail.com',
                    token: '',
                    service: 'spotify_token',
                })
                .expect(400);
        });

        it('Set new token with a bad service', async () => {
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

        it('Set new token successfuly', async () => {
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

    describe('SetNewUser', () => {
        it('Set new user with an email that already exist', async () => {
            await supertest(app)
                .post('/api/setNewUser')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'test@gmail.com',
                })
                .expect(409);
        });
    });

    describe('GetToken', () => {
        it('Get token with a invalid email', async () => {
            await supertest(app)
                .post('/api/getToken')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userEmail: 'NoExist@gmail.com',
                })
                .expect(400);
        });
        it('Get token with a valid email', async () => {
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
