import { HashProvider } from '../../../providers/hash.provider';
import { UserRepository } from '../../../repositories/user.repository';
import { AuthProvider } from '../../../providers/auth.provider';
import { LoginUserUC } from '../login-user-uc.';
import { UserEntity } from '../../../../domain/entities/users/User.entity';
import { Email } from '../../../../domain/value-objects/Email';
import { Password } from '../../../../domain/value-objects/Password';

let mockHashProvider: jest.Mocked<HashProvider>;
let mockUserRepository: jest.Mocked<UserRepository>;
let mockAuthProvider: jest.Mocked<AuthProvider>;
let loginUserUc: LoginUserUC;

describe('Login user usecase test', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        mockAuthProvider = {
            generateToken: jest.fn(),
            validate: jest.fn(),
        };

        mockHashProvider = {
            encrypt: jest.fn(),
            verifyHash: jest.fn(),
        };

        mockUserRepository = {
            findByEmail: jest.fn(),
            save: jest.fn(),
        };

        loginUserUc = LoginUserUC.create(mockAuthProvider, mockUserRepository, mockHashProvider);
    });

    const body = {
        email: 'welltinho@gmail.com',
        password: '123',
    };

    const mockUserEntity = {
        id: 1,
        name: 'Welltinho',
        email: { email: body.email }, //Simular o V-O
        password: { password: 'hashed-password' },
        createdAt: Date.now(),
        verifyValidPassword: jest.fn(),
    } as unknown as UserEntity;

    it('Sucessful login user', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(mockUserEntity); // retorna a entidade falsa que criamos
        (mockUserEntity.verifyValidPassword as jest.Mock).mockResolvedValue(true);
        mockAuthProvider.generateToken.mockReturnValue('token-de-acesso123');

        const output = await loginUserUc.execute(body);

        //  Email Testes
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);
        await expect(mockUserRepository.findByEmail(body.email)).resolves.toHaveProperty('id'); // resolves espeara uma promesa
        // Auth Testes
        expect(mockAuthProvider.generateToken).toHaveBeenCalledWith(mockUserEntity.id, 'user');
        expect(mockAuthProvider.generateToken(mockUserEntity.id!, 'user')).toBe('token-de-acesso123');

        // Output Use Case Testes
        expect(output).toBeDefined();
        expect(output).toHaveProperty('token');
        expect(output.token).toBe('token-de-acesso123');

        expect(output).not.toHaveProperty('password');
    });

    it('Failed user login for invalid email/not found user', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(null);

        await expect(loginUserUc.execute(body)).rejects.toThrow();

        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(body.email);

        expect(mockAuthProvider.generateToken).not.toHaveBeenCalled();
    });

    it('Failed user login for invalid password', async () => {
        mockUserRepository.findByEmail.mockResolvedValue(mockUserEntity);

        (mockUserEntity.verifyValidPassword as jest.Mock).mockResolvedValue(false);

        await expect(loginUserUc.execute(body)).rejects.toThrow();

        expect(mockAuthProvider.generateToken).not.toHaveBeenCalled();
    });
});
