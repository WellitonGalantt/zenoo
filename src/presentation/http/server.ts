import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/users/user.routes';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(morgan('dev'));

app.use('/users', userRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.send(error.message);
});

export default app;
