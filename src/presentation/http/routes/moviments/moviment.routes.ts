import { Request, Response } from 'express';
import { CreateMovimentUC } from '../../../../application/use-cases/moviment/create-moviment.uc';
import { IMovimentRepository } from '../../../../infra/repository/postgres/moviment-repository.postgres';
import { IUserRerpository } from '../../../../infra/repository/postgres/user-repository.postgres';
import { MovimentController } from '../../../controllers/moviments/moviment.controller';
import { ListMovimentUC } from '../../../../application/use-cases/moviment/list-moviments.uc';
import { GetMovimentByIdUC } from '../../../../application/use-cases/moviment/get-movimentby-id.uc';
import { DeleteMovimentByIdUc } from '../../../../application/use-cases/moviment/delete-moviment.uc';

const movimentRouter = require('express').Router();

const movimentRepository = new IMovimentRepository();
const userRepository = new IUserRerpository();
// Use cases
const createMovimentUC = CreateMovimentUC.create(movimentRepository, userRepository);
const listMovimentUC = ListMovimentUC.create(movimentRepository, userRepository);
const findByIdMovimentUC = GetMovimentByIdUC.create(movimentRepository, userRepository);
const deleteMovimentByIdUC = DeleteMovimentByIdUc.create(movimentRepository, userRepository);


const controller = new MovimentController(
    createMovimentUC,
    listMovimentUC,
    findByIdMovimentUC,
    deleteMovimentByIdUC
);

movimentRouter.post('/', (req: Request, res: Response) => {
    controller.create(req, res);
});

movimentRouter.get('/', (req: Request, res: Response) => {
    controller.findAll(req, res);
});

movimentRouter.get('/:id', (req: Request, res: Response) => {
    controller.findById(req, res);
});

movimentRouter.delete('/:id', (req: Request, res: Response) => {
    controller.DeleteById(req, res);
});

export default movimentRouter;
