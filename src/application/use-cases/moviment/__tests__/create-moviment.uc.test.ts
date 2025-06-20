import { MovimentEntity } from '../../../../domain/entities/moviment/Moviment.entity';
import { UserEntity } from '../../../../domain/entities/users/User.entity';
import { Description } from '../../../../domain/value-objects/Description.vo';
import { Title } from '../../../../domain/value-objects/Title.vo';
import { MovimentRepository } from '../../../repositories/moviment.repository';
import { UserRepository } from '../../../repositories/user.repository';
import { CreateMovimentInputDto, CreateMovimentUC } from '../create-moviment.uc';

let movimentRepositoryMock: jest.Mocked<MovimentRepository>;
let userRepositoryMock: jest.Mocked<UserRepository>;
let createMovimentUC: CreateMovimentUC;


describe('Create moviment usecase tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        movimentRepositoryMock = {
            save: jest.fn()
        };

        userRepositoryMock = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn()
        };

        createMovimentUC = CreateMovimentUC.create(movimentRepositoryMock, userRepositoryMock);
    });

    const input: CreateMovimentInputDto = {
        title: 'title',
        short_description: 'short_description',
        value: 100,
        is_fixed: 's',
        type: 'ganho',
        user_id: 1,
        category_id: 1
    };

    const mockUserEntity = {
        id: 1,
        name: 'Welltinho',
        email: { email: 'welltinho@gmail' }, //Simular o V-O
        password: { password: 'hashed-password' },
        createdAt: Date.now(),
        verifyValidPassword: jest.fn(),
    } as unknown as UserEntity;

    const mockMovimentEntity = {
        props: {
            ...input,
            title: Title.create(input.title),
            short_description: Description.create(input.short_description)
        },
        id: 1
    } as unknown as MovimentEntity;

    it('Sucesfull create moviment', async () => {
        

        userRepositoryMock.findById.mockResolvedValue(mockUserEntity);
        movimentRepositoryMock.save.mockResolvedValue(mockMovimentEntity);

        const result = await createMovimentUC.execute(input);

        expect(userRepositoryMock.findById).toHaveBeenCalledWith(input.user_id);
        expect(movimentRepositoryMock.save).toHaveBeenCalledWith(mockMovimentEntity);
        expect(movimentRepositoryMock.save).toHaveBeenCalledWith(expect.any(MovimentEntity));

        expect(result).toHaveProperty('id');
    });
});