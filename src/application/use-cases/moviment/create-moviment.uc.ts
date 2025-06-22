import { UseCaseContract } from '../use-case.contract';
import { MovimentRepository } from '../../repositories/moviment.repository';
import { UserRepository } from '../../repositories/user.repository';
import { DomainInvalidValueException } from '../../../domain/exceptions/Domain-invalid-values.exception';
import { Title } from '../../../domain/value-objects/Title.vo';
import { Description } from '../../../domain/value-objects/Description.vo';
import { MovimentEntity } from '../../../domain/entities/moviment/Moviment.entity';

export type CreateMovimentInputDto = {
    title: string;
    short_description: string;
    value: number;
    is_fixed: string;
    type: string;
    user_id: number;
    category_id: number;
};

export type CreateMovimentUCOutputDto = {
    id: number;
};

export class CreateMovimentUC implements UseCaseContract<CreateMovimentInputDto, CreateMovimentUCOutputDto> {
    private readonly movimentRepository: MovimentRepository;
    private readonly userRepository: UserRepository;

    private constructor(movimentRepository: MovimentRepository, userRepository: UserRepository) {
        this.movimentRepository = movimentRepository;
        this.userRepository = userRepository;
    }

    public static create(movimentRepository: MovimentRepository, userRepository: UserRepository): CreateMovimentUC {
        return new CreateMovimentUC(movimentRepository, userRepository);
    }

    public async execute(input: CreateMovimentInputDto): Promise<CreateMovimentUCOutputDto> {
        const { title, short_description, value, is_fixed, type, user_id, category_id } = input;
        const existUser = await this.userRepository.findById(input.user_id);

        if (!existUser) {
            throw new DomainInvalidValueException('Invalid User! It is not possible to create without a user!');
        }
        const existCategory = 1;

        if (!existCategory) {
            throw new DomainInvalidValueException('Invalid Category! It is not possible to create without a category!');
        }

        const titleObject = Title.create(input.title);
        const descriptionObject = Description.create(input.short_description);

        const movimentEntity = MovimentEntity.create(
            {
                title: titleObject,
                short_description: descriptionObject,
                value,
                is_fixed,
                type,
                user_id,
                category_id,
            },
            existUser.id,
        );

        const newMoviment = await this.movimentRepository.save(movimentEntity);

        return this.presentOutput(newMoviment);
    }

    private presentOutput(entity: MovimentEntity): CreateMovimentUCOutputDto {
        if (!entity.id) throw new DomainInvalidValueException('Moviment id not found!');
        return { id: entity.id };
    }
}
