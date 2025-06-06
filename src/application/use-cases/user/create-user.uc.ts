import { UserEntity } from "../../../domain/entities/User.entity";
import { DomainInvalidValueException } from "../../../domain/exceptions/Domain-invalid-values.exception";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { HashProvider } from "../../providers/hash.provider";
import { UserRepository } from "../../repositories/user.repository";
import { UseCaseContract } from "../use-case.contract";

export type CreateUserUCInputDto = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export type CreateUserUCOutputDto = {
    id: number
}

export class CreateUserUC
    implements UseCaseContract<CreateUserUCInputDto, CreateUserUCOutputDto>  {

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
        const {name, email, password, confirm_password} = inputDto;

        if(!(password === confirm_password)){
            throw new DomainInvalidValueException("A senhas nao conferem!")
        }

        const emailObject = Email.create(email);
        const passwordObject = Password.create(password, this.hashProvider);

        const entity = UserEntity.create(
            {
                name: name,
                email: emailObject,
                password: passwordObject,

            }
        )

        return await this.userRepository.save(entity);
    }
}