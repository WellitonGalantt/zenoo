import { UserEntity } from "../../domain/entities/User.entity";

export interface UserRepository {
    save(entity: UserEntity): Promise<{id: number}>
}