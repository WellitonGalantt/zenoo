import { MovimentsFailedOparation } from "../../../domain/exceptions/Moviments-failed-operation.exception";
import { ListMovimentsInvalidMoviment } from "../../../domain/exceptions/Moviments-invalid-moviment.exception copy";
import { MovimentsInvalidUser } from "../../../domain/exceptions/Moviments-invalid-user.exception copy";
import { MovimentRepository } from "../../repositories/moviment.repository";
import { UserRepository } from "../../repositories/user.repository";
import { UseCaseContract } from "../use-case.contract";

export type UpdateMovimentInputDto = {
    id: number
    user_id: number
    data : {
        title: string;
        short_description: string;
        value: number;
        is_fixed: string;
        type: string;
        category_id: number;
    }
}
export type UpdateMovimentOutputDto = void;

export class UpdateMovimentUC implements UseCaseContract<UpdateMovimentInputDto, UpdateMovimentOutputDto> {

    private constructor(
        private readonly movimentRepository: MovimentRepository,
        private readonly userRepository: UserRepository
    ) { }

    public static create(movimentRepository: MovimentRepository, userRepository: UserRepository): UpdateMovimentUC {
        return new UpdateMovimentUC(movimentRepository, userRepository);
    }

    public async execute(input: UpdateMovimentInputDto): Promise<UpdateMovimentOutputDto> {
        const existUser = await this.userRepository.findById(input.user_id);

        const data = input.data;

        if (!existUser) {
            throw new MovimentsInvalidUser('Invalid User! It is not possible to create without a user!');
        }

        const moviment = await this.movimentRepository.findById(input.id, input.user_id);

        if (!moviment) {
            throw new ListMovimentsInvalidMoviment('Invalid Moviment! It is not possible to update without a moviment!');
        }

        //Verificar a categoria quando implementaro banco de dados
        const existCategory = 1;

        if (!existCategory) {
            throw new MovimentsFailedOparation('Invalid Category! It is not possible to create without a category!');
        }

        moviment.updateTitle(data.title);
        moviment.updateDescription(data.short_description);
        moviment.updateValue(data.value);
        moviment.updateIdFixed(data.is_fixed);
        moviment.updateType(data.type);
        moviment.updateCategory(data.category_id);

        await this.movimentRepository.update(moviment);
    }
}