import { Request, Response } from "express";
import { CreateMovimentInputDto, CreateMovimentUC } from "../../../application/use-cases/moviment/create-moviment.uc";


export class MovimentController {
    constructor(
        // Definindo a propriedade do Use Case para usar no controller
        private createMovimentUC: CreateMovimentUC
    ){}

    public async create(req: Request<{}, CreateMovimentInputDto>, res: Response) : Promise<void> {
        try{
            const body = req.body;

            const result = await this.createMovimentUC.execute(body);

            res.status(201).json(result);
            return;

        }
        catch( error ) {
            res.status(500).json({ message: `Internal server error: ${error}` });
            return;
        }

    }


}