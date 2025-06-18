import { UserEntity } from '../../../../domain/entities/users/User.entity';
import { DomainInvalidValueException } from '../../../../domain/exceptions/Domain-invalid-values.exception';
import { Email } from '../../../../domain/value-objects/Email';
import { Password } from '../../../../domain/value-objects/Password';
import { HashProvider } from '../../../providers/hash.provider';
import { UserRepository } from '../../../repositories/user.repository';
import { CreateUserUC } from '../create-user.uc';

let mockUserRepository: jest.Mocked<UserRepository>;
let mockHashProvider: jest.Mocked<HashProvider>;
let createUserUC: CreateUserUC;

describe('Create user usecase tests', () => {
    //Acoes antes do teste
    beforeEach(() => {
        jest.clearAllMocks();
        
        mockUserRepository = {
            save: jest.fn(), // Diz que é um funcao especial do jest, uma função falsa
            findByEmail: jest.fn(),
        };

        mockHashProvider = {
            encrypt: jest.fn(),
            verifyHash: jest.fn(),
        };

        createUserUC = CreateUserUC.create(mockUserRepository, mockHashProvider);
    });

    it('Sucessful user creation', async () => {
        const input = {
            name: 'wellton',
            email: 'wellton@gmail.com',
            password: 'senhaTop123',
            confirm_password: 'senhaTop123',
        };

        //simulando o retorno da busca do email como null;
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockHashProvider.encrypt.mockResolvedValue('dmaw324@3abhdsygu21897323ty26');
        mockUserRepository.save.mockResolvedValue(
            UserEntity.create(
                {
                    name: input.name,
                    email: Email.create('wellton@gmail.com'),
                    password: Password.create('dmaw324@3abhdsygu21897323ty26'),
                },
                1,
            ),
        );

        const output = await createUserUC.execute(input);

        //Verifica se foi chamado com um valor especifico;
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(mockHashProvider.encrypt).toHaveBeenCalledWith(input.password);

        //Verifica de foi chamado independente do valor passado
        expect(mockUserRepository.save).toHaveBeenCalled();
        //O expect.any fala que ele deve receber qualquer valores desde q a instancia seja da entidade especifica;
        expect(mockUserRepository.save).toHaveBeenCalledWith(expect.any(UserEntity));
    });

    it('Email already regitred error.', () => {
        const input = {
            name: 'wellton',
            email: 'wellton@gmail.com',
            password: 'senhaTop123',
            confirm_password: 'senhaTop123',
        };

        const userEntity = UserEntity.create(
            {
                name: input.name,
                email: Email.create('wellton@gmail.com'),
                password: Password.create('dmaw324@3abhdsygu21897323ty26'),
            },
            1,
        );

        mockUserRepository.findByEmail.mockResolvedValue(userEntity);

        // Rejeição com a instancia do erro;
        expect(createUserUC.execute(input)).rejects.toBeInstanceOf(DomainInvalidValueException);
        //Verifica se nao foi chamada, se o sitema parou onde deveria;
        expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
});
