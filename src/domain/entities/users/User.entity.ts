// Entidade para usuario

import { HashProvider } from '../../../application/providers/hash.provider';
import { DomainInvalidValueException } from '../../exceptions/Domain-invalid-values.exception';
import { Email } from '../../value-objects/Email.vo';
import { Password } from '../../value-objects/Password.vo';
import { Entity } from '../Entity';
type UserProps = {
    name: string;
    email: Email;
    password: Password;
    created_at?: Date;
};

export class UserEntity extends Entity<UserProps> {
    private constructor(props: UserProps, id?: number) {
        super(props, id);
    }

    public static create(props: UserProps, id?: number): UserEntity {
        const { name, email, password, created_at } = props;

        if (name.length <= 3) throw new DomainInvalidValueException('Nome deve ser maior que 3 caracteres!');

        return new UserEntity(
            {
                name,
                email,
                password,
                created_at: created_at ?? new Date(),
            },
            id,
        );
    }

    get name(): string {
        return this.props.name;
    }

    get email(): Email {
        return this.props.email;
    }

    get password(): Password {
        return this.props.password;
    }

    get createdAt(): Date {
        return this.props.created_at!;
    }

    public changeName(newName: string): void {
        if (newName.length <= 3) throw new DomainInvalidValueException('Nome deve ser maior que 3 caracteres!');

        this.props.name = newName;
    }

    public async verifyValidPassword(rawPassword: string, hashProvider: HashProvider): Promise<boolean> {
        return await hashProvider.verifyHash(this.password.password, rawPassword);
    }
}
