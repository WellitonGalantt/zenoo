import express from "express";
import helmet from "helmet";
import cors from "cors"
import morgan from "morgan";

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(morgan('dev'));

export default app; 