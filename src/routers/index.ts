import { Router } from 'express';
import { inputRouter } from './inputRouter';
import { levelsRouter } from './levelsRouter';
import { sessionsRouter } from './sessionsRouter';

export const router = Router();

router.use(inputRouter);
router.use(levelsRouter);
router.use(sessionsRouter);
