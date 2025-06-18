import { UserEntity } from '../../../domain/entities/users/User.entity';
import { AutheticationFailedException } from '../../../domain/exceptions/Authetication-failed.exception';
import { AuthProvider } from '../../providers/auth.provider';
import { HashProvider } from '../../providers/hash.provider';
import { UserRepository } from '../../repositories/user.repository';
import { UseCaseContract } from '../use-case.contract';

export type LoginUserInputDto = {
    email: string;
    password: string;
};

export type LoginUserOutputDto = {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        created_at: Date;
    };
};

export class LoginUserUC implements UseCaseContract<LoginUserInputDto, LoginUserOutputDto> {
    private constructor(
        private readonly authProvider: AuthProvider,
        private readonly userRepository: UserRepository,
        private readonly hashProvider: HashProvider,
    ) { }

    public static create(
        authProvider: AuthProvider,
        userRepository: UserRepository,
        hashProvider: HashProvider,
    ): LoginUserUC {
        return new LoginUserUC(authProvider, userRepository, hashProvider);
    }

    public async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {
        const { email, password } = input;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AutheticationFailedException('Invalid Credentials!');
        }

        console.log(user);

        if (!user.id) {
            throw new AutheticationFailedException('Not found User id. Data integrity error!');
        }

        const verifyPassword = await user.verifyValidPassword(password, this.hashProvider);

        console.log(verifyPassword);
        if (!verifyPassword) {
            throw new AutheticationFailedException('Invalid Credentials!');
        }

        const authToken = this.authProvider.generateToken(user.id, 'user');

        return this.presentOutput(user, authToken);
    }

    private presentOutput(entity: UserEntity, token: string): LoginUserOutputDto {
        if (!entity.id) {
            throw new AutheticationFailedException('Not found User id. Data integrity error!');
        }

        return {
            token: token,
            user: {
                id: entity.id,
                name: entity.name,
                email: entity.email.email,
                created_at: entity.createdAt,
            },
        };
    }
}
