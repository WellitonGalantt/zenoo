import e from "express";
import { MovimentEntity } from "../../../domain/entities/moviment/Moviment.entity";
import { MovimentsInvalidUser } from "../../../domain/exceptions/Moviments-invalid-user.exception";
import { MovimentRepository } from "../../repositories/moviment.repository";
import { UserRepository } from "../../repositories/user.repository";
import { UseCaseContract } from "../use-case.contract";
import { ListMovimentsInvalidMoviment } from "../../../domain/exceptions/Moviments-invalid-moviment.exception copy";

export type GetMovimentByIDInputDto = {
    id: number;
    user_id: number;
}

export type GetMovimentByIDOutputDto = {
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
}


export class GetMovimentByIdUC implements UseCaseContract<GetMovimentByIDInputDto, GetMovimentByIDOutputDto> {

    private constructor (
        private readonly movimentRepository: MovimentRepository,
        private readonly userRepository: UserRepository
    ){}

    public static create(movimentRepository: MovimentRepository, userRepository: UserRepository): GetMovimentByIdUC {
        return new GetMovimentByIdUC(movimentRepository, userRepository);
    }

    public async execute(input: GetMovimentByIDInputDto): Promise<GetMovimentByIDOutputDto> {
        const existUser = await this.userRepository.findById(input.user_id);

        if ( !existUser ) {
            throw new MovimentsInvalidUser('Invalid User! It is not possible to create without a user!');
        }

        const movimentEntity = await this.movimentRepository.findById(input.id, input.user_id);
        // Nunca retornar a entidade diretamenete, sempre retornar o output
        return this.presentOutput(movimentEntity);
    }

    private presentOutput(entity: MovimentEntity): GetMovimentByIDOutputDto {
        if (!entity.id) throw new ListMovimentsInvalidMoviment('Moviment id not found!');
        return {
            id: entity.id,
            title: entity.title,
            short_description: entity.short_description,
            value: entity.value,
            is_fixed: entity.is_fixed,
            type: entity.type,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
            user_id: entity.user_id,
            category_id: entity.category_id
        }
    }
}