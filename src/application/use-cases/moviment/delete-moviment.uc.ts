import { MovimentsFailedOparation } from "../../../domain/exceptions/Moviments-failed-operation.exception";
import { MovimentsInvalidUser } from "../../../domain/exceptions/Moviments-invalid-user.exception";
import { MovimentRepository } from "../../repositories/moviment.repository";
import { UserRepository } from "../../repositories/user.repository";
import { UseCaseContract } from "../use-case.contract";

export type DeleteMovimentInputDto = {
    id: number;
    user_id: number;
}

export type DeleteMovimentOutputDto = {
    rowCount: number | null;
};

export class DeleteMovimentByIdUc implements UseCaseContract<DeleteMovimentInputDto, DeleteMovimentOutputDto> {

    private constructor(
        private readonly movimentRepository: MovimentRepository,
        private readonly userRepository: UserRepository
    ) { }

    public static create(movimentRepository: MovimentRepository, userRepository: UserRepository): DeleteMovimentByIdUc {
        return new DeleteMovimentByIdUc(movimentRepository, userRepository);
    }

    public async execute(input: DeleteMovimentInputDto): Promise<DeleteMovimentOutputDto> {

        const existUser = await this.userRepository.findById(input.user_id);
        if (!existUser) {
            throw new MovimentsInvalidUser("Invalid User! It is not possible to delete without a user!");
        }

        const result = await this.movimentRepository.deleteByID(input.id, input.user_id);

        if (!result.rowCount || result.rowCount <= 0) {
            throw new MovimentsFailedOparation("Failed to delete moviment");
        }

        return result;
    }
}