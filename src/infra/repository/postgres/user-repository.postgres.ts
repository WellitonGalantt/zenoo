//Implementacao do UserRepository

import { UserRepository } from "../../../application/repositories/user.repository";
import { UserEntity } from "../../../domain/entities/User.entity";
import { db } from "../../db/postgres/database.postgres";
import { UserMapper } from "./mappers/user-repository.mapper";

//Dados que vem do banco de dados
export type UserDataRow = {
    id: number;
    name: string;
    email: string;
    password: string; // O nome da coluna no banco
    created_at: Date;
};

export class IUserRerpository implements UserRepository {

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const query = 'SELECT * FROM users WHERE email = $1'

        // Faz a busca no banco de dados passado uma tipagem do dado especifico;
        const result = await db.query<UserDataRow>(query, [email]);

        if (result.rows.length === 0) {
            return null
        }

        const userRow = result.rows[0];

        const entity = UserMapper.toDomain(userRow);

        return entity;
    }

    public async save(entity: UserEntity): Promise<UserEntity> {

        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';

        const result = await db.query<UserDataRow>(query, [entity.name, entity.email.email, entity.password.password]);
        
        return UserMapper.toDomain(result.rows[0]);
    }
}