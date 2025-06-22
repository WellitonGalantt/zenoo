import { MovimentEntity } from '../../../domain/entities/moviment/Moviment.entity';
import { ListMovimentsInvalidMoviment } from '../../../domain/exceptions/List-Moviments-invalid-moviment.exception copy';
import { ListMovimentsInvalidUser } from '../../../domain/exceptions/List-Moviments-invalid-user.exception';
import { MovimentRepository } from '../../repositories/moviment.repository';
import { UserRepository } from '../../repositories/user.repository';
import { UseCaseContract } from '../use-case.contract';

export type ListMovimnetInputDto = {
    user_id: number;
};
export type ListMovimnetOutputDto = {
    //Criado para retornar o moviment em formato abstrato para as camadas de baixo nivel nao terema acesso a entidade diretamente
    moviments: {
        id: number;
        title: string;
        short_description: string;
        value: number;
        is_fixed: string;
        type: string;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        category_id: number;
    }[];
};

export class ListMovimentUC implements UseCaseContract<ListMovimnetInputDto, ListMovimnetOutputDto> {
    private constructor(
        private readonly movimentRepository: MovimentRepository,
        private readonly userRepository: UserRepository,
    ) {}

    public static create(movimentRepository: MovimentRepository, userRepository: UserRepository): ListMovimentUC {
        return new ListMovimentUC(movimentRepository, userRepository);
    }

    public async execute(input: ListMovimnetInputDto): Promise<ListMovimnetOutputDto> {
        const existUser = await this.userRepository.findById(input.user_id);

        if (!existUser) {
            throw new ListMovimentsInvalidUser('Invalid User! It is not possible to create without a user!');
        }

        // Enviando o id do usuario para pegar apenas do usuario logado;
        const moviment = await this.movimentRepository.findAll(input.user_id);
        return this.presentOutput(moviment);
    }

    private presentOutput(moviment: MovimentEntity[]): ListMovimnetOutputDto {
        const listMoviments = moviment.map((m: MovimentEntity) => {
            if (!m.id) throw new ListMovimentsInvalidMoviment('Moviment id not found!');
            return {
                id: m.id!,
                title: m.title,
                short_description: m.short_description,
                value: m.value,
                is_fixed: m.is_fixed,
                type: m.type,
                created_at: m.createdAt,
                updated_at: m.updatedAt,
                user_id: m.user_id,
                category_id: m.category_id,
            };
        });
        return { moviments: listMoviments };
    }
}
