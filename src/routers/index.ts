import { Router } from 'express';
import { inputRouter } from './inputRouter';

export const router = Router();

router.use(inputRouter);