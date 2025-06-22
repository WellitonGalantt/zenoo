import { db } from '../../../../../infra/db/postgres/database.postgres';
import app from '../../../server';
import request from 'supertest';

describe('Moviment routes tests', () => {
    beforeAll(async () => {
        //Sempre limpar os as tabelas para ter um padrao de teste
        const queryMoviment = `DELETE FROM moviment`;
        const queryUser = `DELETE FROM users`;
        await db.query(queryMoviment);
        await db.query(queryUser);
    });

    afterAll(async () => {
        await db.end();
    });

    it('POST /moviments : Create moviment route returnung 201 status code', async () => {
        const userQuery = `INSERT INTO users (name, email, password) VALUES ('Welliton', 'welliton@gmail.com', 'senhatop123') RETURNING id`;
        const userId = await db.query(userQuery);

        console.log(userId.rows[0].id);

        const movimentData = {
            title: 'Title Top',
            short_description: 'Descrição top demais',
            value: 199,
            is_fixed: 's',
            type: 'gasto',
            user_id: userId.rows[0].id,
            category_id: 1,
        };

        const response = await request(app).post('/moviments').send(movimentData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('POST /moviments : Create moviment route returnung 500 status code, invalid user', async () => {
        const movimentData = {
            title: 'Title Top',
            short_description: 'Descrição top demais',
            value: 199,
            is_fixed: 's',
            type: 'gasto',
            user_id: 0,
            category_id: 1,
        };

        const response = await request(app).post('/moviments').send(movimentData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body).not.toHaveProperty('id');
    });

    it('POST /moviments : Create moviment route returnung 500 status code, invalid user', async () => {
        const movimentData = {
            title: 'Title Top',
            short_description: 'Descrição top demais',
            value: 199,
            is_fixed: 's',
            type: 'gasto',
            user_id: 0,
            category_id: 1,
        };

        const response = await request(app).post('/moviments').send(movimentData);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body).not.toHaveProperty('id');
    });
});
