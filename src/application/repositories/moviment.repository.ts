import { MovimentEntity } from '../../domain/entities/moviment/Moviment.entity';
import { DeleteMovimentOutputDto } from '../use-cases/moviment/delete-moviment.uc';

export interface MovimentRepository {
    save(entity: MovimentEntity): Promise<MovimentEntity>;
    findAll(user_id: number): Promise<MovimentEntity[]>;
    findById(id: number, user_id: number): Promise<MovimentEntity>;
    deleteByID(id: number, user_id: number): Promise<DeleteMovimentOutputDto>;
    update(data: MovimentEntity): Promise<void>;
}
