import { MovimentRepository } from '../../../application/repositories/moviment.repository';
import { DeleteMovimentOutputDto } from '../../../application/use-cases/moviment/delete-moviment.uc';
import { MovimentEntity } from '../../../domain/entities/moviment/Moviment.entity';
import { UpdateMovimentError } from '../../../domain/exceptions/Moviments-invalid-user.exception';
import { db } from '../../db/postgres/database.postgres';
import { MovimentMapper } from './mappers/moviment-repository.mapper';

export type MovimentDataRow = {
    id: number;
    title: string;
    short_description: string;
    value: number;
    is_fixed: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    category_id: number;
};

export class IMovimentRepository implements MovimentRepository {
    async save(entity: MovimentEntity): Promise<MovimentEntity> {
        const query =
            'INSERT INTO moviment (title, short_description, value, is_fixed, type, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

        const result = await db.query<MovimentDataRow>(query, [
            entity.title,
            entity.short_description,
            entity.value,
            entity.is_fixed,
            entity.type,
            entity.user_id,
            entity.category_id,
        ]);

        return MovimentMapper.toDomain(result.rows[0]);
    }

    async findAll(user_id: number): Promise<MovimentEntity[]> {
        const query = 'SELECT * FROM moviment WHERE user_id = $1';
        const result = await db.query<MovimentDataRow>(query, [user_id]);

        const allMoviments = result.rows.map(MovimentMapper.toDomain);
        return allMoviments;
    }

    async findById(movimnet_id: number, user_id: number): Promise<MovimentEntity> {
        const query = `SELECT * FROM moviment WHERE id = $1 AND user_id = $2`;
        const result = await db.query<MovimentDataRow>(query, [movimnet_id, user_id]);

        const moviment = result.rows[0];
        return MovimentMapper.toDomain(moviment);
    }

    async deleteByID(id: number, user_id: number): Promise<DeleteMovimentOutputDto> {
        const query = 'DELETE FROM moviment WHERE id = $1 AND user_id = $2';
        const result = await db.query(query, [id, user_id]);

        return { rowCount: result.rowCount };
    }

    async update(data: MovimentEntity): Promise<void> {
        const query = `UPDATE moviment SET title = $1, short_description = $2, value = $3, is_fixed = $4, type = $5, category_id = $6 WHERE id = $7 AND user_id = $8`;
        const result = await db.query(query, [
            data.title,
            data.short_description,
            data.value,
            data.is_fixed,
            data.type,
            data.category_id,
            data.id,
            data.user_id,
        ])

        if(!result.rowCount || result.rowCount <= 0 ) throw new UpdateMovimentError('Moviment not found!');

        return;
    }
}
