import { UserEntity } from '../../../domain/entities/users/User.entity';
import { DomainInvalidValueException } from '../../../domain/exceptions/domainfixexception';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { HashProvider } from '../../providers/hash.provider';
import { UserRepository } from '../../repositories/user.repository';
import { UseCaseContract } from '../use-case.contract';

export type CreateUserUCInputDto = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
};

export type CreateUserUCOutputDto = {
    id: number;
};

export class CreateUserUC implements UseCaseContract<CreateUserUCInputDto, CreateUserUCOutputDto> {
    private readonly userRepository: UserRepository;
    private readonly hashProvider: HashProvider;

    private constructor(userRepository: UserRepository, hashProvider: HashProvider) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
    }

    public static create(userRepository: UserRepository, hashProvider: HashProvider): CreateUserUC {
        return new CreateUserUC(userRepository, hashProvider);
    }

    public async execute(inputDto: CreateUserUCInputDto): Promise<CreateUserUCOutputDto> {
        const { name, email, password, confirm_password } = inputDto;

        const emailExist = await this.userRepository.findByEmail(email);
        if (emailExist) {
            throw new DomainInvalidValueException('Email já esta registrado');
        }

        if (!(password === confirm_password)) {
            throw new DomainInvalidValueException('A senhas nao conferem!');
        }

        const emailObject = Email.create(email);

        const hashedPassword = await this.hashProvider.encrypt(password);
        const passwordObject = Password.create(hashedPassword);

        const entity = UserEntity.create({
            name: name,
            email: emailObject,
            password: passwordObject,
        });

        const newUser = await this.userRepository.save(entity);

        return this.presentOutput(newUser);
    }

    private presentOutput(entity: UserEntity): CreateUserUCOutputDto {
        if (!entity.id) throw new DomainInvalidValueException('Id do usuario criado nao encontrado!');

        const userId: CreateUserUCOutputDto = {
            id: entity.id,
        };

        return userId;
    }
}
