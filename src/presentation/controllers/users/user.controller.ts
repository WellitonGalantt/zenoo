import { Request, Response } from 'express';
import { CreateUserUC } from '../../../application/use-cases/user/create-user.uc';

type ReqBodyData = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
};

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUC, //Automaticamnete ja faz a atribuicao dos atributos sem precisar do this.
    ) {}

    public async create(req: Request<{}, ReqBodyData>, res: Response): Promise<void> {
        try {
            const { name, email, password, confirm_password } = req.body;

            const createUserId = await this.createUserUseCase.execute({
                name,
                email,
                password,
                confirm_password,
            });

            res.status(201).json(createUserId);
            return;
        } catch (error) {
            res.status(500).json({ message: `Internal server error: ${error}` });
            return;
        }
    }
}
