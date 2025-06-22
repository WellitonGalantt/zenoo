import { MovimentEntity } from '../../domain/entities/moviment/Moviment.entity';

export interface MovimentRepository {
    save(entity: MovimentEntity): Promise<MovimentEntity>;
    findAll(user_id: number): Promise<MovimentEntity[]>;
}
