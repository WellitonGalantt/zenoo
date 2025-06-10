import request from 'supertest';
import { db } from '../../../../../infra/db/postgres/database.postgres';
import app from '../../../server';

describe('User routes tests', () => {
    beforeAll(async () => {
        const query = `DELETE FROM users`;
        await db.query(query);
    });

    afterAll(async () => {
        await db.end();
    });

    it('POST /users/ : Create user route returnung 201 status code', async () => {
        const userData = {
            name: 'Welliton',
            email: 'welliton@gmail.com',
            password: 'senhatop123',
            confirm_password: 'senhatop123',
        };

        const response = await request(app).post('/users').send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).not.toHaveProperty('password');
    });

    it('POST /users/ : Failed invalid email error test', async ()=>{

        const userData = {
            name: 'Welliton',
            email: 'wellitongmail.com',
            password: 'senhatop123',
            confirm_password: 'senhatop123',
        };

        const response = await request(app).post('/users').send(userData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body).not.toHaveProperty('id');
        expect(response.body).not.toHaveProperty('password');
    })

    it('POST /users/ : Failed password test does not match', async ()=>{
        const userData = {
            name: 'Welliton',
            email: 'welliton@gmail.com',
            password: 'senhatop123',
            confirm_password: 'senhatop1234',
        };

        const response = await request(app).post('/users').send(userData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body).not.toHaveProperty('id');
        expect(response.body).not.toHaveProperty('password');
    })
});
