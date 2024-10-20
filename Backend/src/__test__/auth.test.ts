import createTestServer from '../utils/test.server';
import supertest from 'supertest';

const app = createTestServer();

describe('Auth', () => {
    describe('Login', () => {
        it('Login user with missing informations', async () => {
            await supertest(app).post('/api/login').expect(400);
        });

        it('Login user with wrong informations', async () => {
            await supertest(app)
                .post('/api/login')
                .send({ email: 'test@gmail.com', password: '123abc' })
                .expect(401);
        });

        it('Login user with good informations', async () => {
            await supertest(app)
                .post('/api/login')
                .send({
                    email: 'test@gmail.com',
                    password: 'Test1.',
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
                    name: 'test',
                    surname: 'test',
                    username: 'test',
                    email: 'test@gmail.com',
                    password: 'test',
                })
                .expect(409);
        });
    });
});
