import { MovimentEntity } from '../../../../domain/entities/moviment/Moviment.entity';
import { UserEntity } from '../../../../domain/entities/users/User.entity';
import { MovimentRepository } from '../../../repositories/moviment.repository';
import { UserRepository } from '../../../repositories/user.repository';
import { ListMovimentUC } from '../list-moviments.uc';
import { ListMovimnetOutputDto } from '../list-moviments.uc';


let movimentRepositoryMock: jest.Mocked<MovimentRepository>;
let userRepositoryMock: jest.Mocked<UserRepository>;
let listMovimentUC: ListMovimentUC;

describe('List moviments usecase tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        movimentRepositoryMock = {
            save: jest.fn(),
            findAll: jest.fn(),
        };

        userRepositoryMock = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
        };

        // Criadno a instancia com fabricator
        listMovimentUC = ListMovimentUC.create(movimentRepositoryMock, userRepositoryMock);
    });

    const mockUserEntity = {
        id: 1,
        name: 'Welltinho',
        email: { email: 'welltinho@gmail' }, //Simular o V-O
        password: { password: 'hashed-password' },
        createdAt: Date.now(),
        verifyValidPassword: jest.fn(),
    } as unknown as UserEntity;

    const movimnetMock1 = {
        id: 1,
        title: { title: 'Salario' },
        short_description: { shory_description: 'Salario do mes' },
        value: 2300,
        is_fixed: 's',
        type: 'ganho',
        user_id: 1,
        category_id: 1,
    } as unknown as MovimentEntity;

    const movimnetMock2 = {
        ...movimnetMock1,
        id: 2,
        title: { title: 'Aluguel' },
        short_description: { shory_description: 'Aluguel do mes' },
        type: 'gasto',
    } as unknown as MovimentEntity;

    const allMoviments = [movimnetMock1, movimnetMock2];

    it('Sucessful should list moviments', async () => {

        userRepositoryMock.findById.mockResolvedValue(mockUserEntity);
        movimentRepositoryMock.findAll.mockResolvedValue(allMoviments);

        const result = await listMovimentUC.execute({ user_id: mockUserEntity.id! });

        expect(userRepositoryMock.findById).toHaveBeenCalledWith(mockUserEntity.id!);
        expect(movimentRepositoryMock.findAll).toHaveBeenCalledWith(mockUserEntity.id!);
        expect(result).toBeInstanceOf(Object);
        //  Usar o toEqual para comparar os objetos, pois o toBe serve para compara rvalores primitivos, como 1==2, "name" == "name"...
        // Naos serve para objetos e arrays por exemplo
        expect(result).toEqual({ moviments: [movimnetMock1, movimnetMock2] });
    });

});