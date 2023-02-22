import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from '@/routers';
import { errorHandler } from '@/middlewares';

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

export default app;