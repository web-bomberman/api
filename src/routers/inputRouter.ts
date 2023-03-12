import { Router } from 'express';
import { authValidation } from '@/middlewares';

import {
  inputUp,
  inputRight,
  inputDown,
  inputLeft,
  inputBomb,
} from '@/controllers';

export const inputRouter = Router();

inputRouter.post('/input/up', authValidation, inputUp);

inputRouter.post('/input/right', authValidation, inputRight);

inputRouter.post('/input/down', authValidation, inputDown);

inputRouter.post('/input/left', authValidation, inputLeft);

inputRouter.post('/input/bomb', authValidation, inputBomb);
