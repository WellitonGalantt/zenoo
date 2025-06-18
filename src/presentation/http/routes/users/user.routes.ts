import { Router } from 'express';
import { UserController } from '../../../controllers/users/user.controller';
import { IUserRerpository } from '../../../../infra/repository/postgres/user-repository.postgres';
import { IHashProvider } from '../../../../infra/providers/bcrypt/hash.provider';
import { CreateUserUC } from '../../../../application/use-cases/user/create-user.uc';
import { LoginUserUC } from '../../../../application/use-cases/user/login-user-uc.';
import { IAuthProvider } from '../../../../infra/providers/bcrypt/auth.provider';

const userRouter = Router();

const userRepository = new IUserRerpository();
const hasher = new IHashProvider();
const createUserUseCase = CreateUserUC.create(userRepository, hasher);
const authProvider = new IAuthProvider();
const loginUserUseCase = LoginUserUC.create(authProvider, userRepository, hasher);
const controller = new UserController(createUserUseCase, loginUserUseCase);

userRouter.post('/', (req, res) => controller.create(req, res));
userRouter.post('/login', (req, res) => controller.userLogin(req, res));

export default userRouter;
