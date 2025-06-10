import { UserEntity } from '../../../../domain/entities/users/User.entity';
import { Email } from '../../../../domain/value-objects/Email';
import { Password } from '../../../../domain/value-objects/Password';
import { UserDataRow } from '../user-repository.postgres';

// Faz um mapeamento dos dados chegos do banco de dados para um entidade
export class UserMapper {
    public static toDomain(data: UserDataRow): UserEntity {
        return UserEntity.create(
            {
                name: data.name,
                email: Email.create(data.email),
                password: Password.create(data.password),
                created_at: data.created_at,
            },
            data.id,
        );
    }
}
