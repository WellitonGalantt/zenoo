import { UserEntity } from '../../domain/entities/users/User.entity';

export interface UserRepository {
    save(entity: UserEntity): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
