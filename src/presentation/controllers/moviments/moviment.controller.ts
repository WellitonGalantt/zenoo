import { Request, Response } from 'express';
import { CreateMovimentInputDto, CreateMovimentUC } from '../../../application/use-cases/moviment/create-moviment.uc';
import { GetMovimentByIDInputDto, GetMovimentByIdUC } from '../../../application/use-cases/moviment/get-movimentby-id.uc';
import { ListMovimentUC, ListMovimnetInputDto } from '../../../application/use-cases/moviment/list-moviments.uc';

export class MovimentController {
    constructor(
        // Definindo a propriedade do Use Case para usar no controller
        private createMovimentUC: CreateMovimentUC,
        private listMovimentUC: ListMovimentUC,
        private getMovimentByIdUC: GetMovimentByIdUC
    ) { }

    public async create(req: Request<{}, CreateMovimentInputDto>, res: Response): Promise<void> {
        try {
            const body = req.body;

            const result = await this.createMovimentUC.execute(body);

            res.status(201).json(result);
            return;
        } catch (error) {
            res.status(500).json({ message: `Internal server error: \n\n${error}` });
            return;
        }
    }

    public async findAll(req: Request<{}, ListMovimnetInputDto>, res: Response): Promise<void> {
        try {
            const body = req.body;

            const result = await this.listMovimentUC.execute(body);
            res.status(201).json(result);
            return;

        } catch (error) {
            res.status(500).json({ message: `Internal server error: \n\n${error}` });
            return;
        }
    }

    public async findById(req: Request<{ id?: number }, { user_id: number }>, res: Response): Promise<void> {
        try {
            const { user_id } = req.body;
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ message: 'Moviment id is required' });
                return;
            }

            const result = await this.getMovimentByIdUC.execute({ id, user_id });

            res.status(201).json(result);
            return;

        } catch (error) {
            res.status(500).json({ message: `Internal server error: \n\n${error}` });
            return;
        }
    }
}
