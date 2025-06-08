import { Router } from "express";
import { UserController } from "../../../controllers/users/user.controller";
import { IUserRerpository } from "../../../../infra/repository/postgres/user-repository.postgres";
import { IHashProvider } from "../../../../infra/providers/bcrypt/hash.provider";
import { CreateUserUC } from "../../../../application/use-cases/user/create-user.uc";


const userRouter = Router();

const userRepository = new IUserRerpository();
const hasher = new IHashProvider();
const createUserUseCase = CreateUserUC.create(userRepository, hasher);
const controller = new UserController(createUserUseCase);

userRouter.post('/', (req, res) => controller.create(req, res));

export default userRouter;