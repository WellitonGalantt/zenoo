import { Request, Response } from "express";
import { CreateMovimentUC } from "../../../../application/use-cases/moviment/create-moviment.uc";
import { IMovimentRepository } from "../../../../infra/repository/postgres/moviment-repository.postgres";
import { IUserRerpository } from "../../../../infra/repository/postgres/user-repository.postgres";
import { MovimentController } from "../../../controllers/moviments/moviment.controller";

const movimentRouter = require('express').Router();

const movimentRepository = new IMovimentRepository();
const userRepository = new IUserRerpository();
const createMovimentUC = CreateMovimentUC.create(movimentRepository, userRepository);
const controller = new MovimentController(createMovimentUC);


movimentRouter.post('/create', (req: Request, res: Response) => { controller.create(req, res) });

export default movimentRouter;