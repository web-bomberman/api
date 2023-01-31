import { Router } from 'express';
import { inputRouter } from './inputRouter';
import { sessionsRouter } from './sessionsRouter';

export const router = Router();

router.use(inputRouter);
router.use(sessionsRouter);