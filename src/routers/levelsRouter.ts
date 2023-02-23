import { Router } from 'express';
import { getLevels } from '@/controllers';

export const levelsRouter = Router();

levelsRouter.get(
  '/levels',
  getLevels
);