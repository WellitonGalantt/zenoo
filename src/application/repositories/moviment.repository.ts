import { MovimentEntity } from "../../domain/entities/moviment/Moviment.entity";

export interface MovimentRepository {
    save(entity: MovimentEntity): Promise<MovimentEntity>
}