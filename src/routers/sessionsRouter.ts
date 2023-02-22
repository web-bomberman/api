import { Router } from 'express';
import { authValidation } from '@/middlewares';

import {
  newSession,
  connectToSession,
  getSession,
  setReady
} from '@/controllers';

export const sessionsRouter = Router();

sessionsRouter.get(
  '/sessions',
  authValidation,
  getSession
);

sessionsRouter.post(
  '/sessions/new',
  newSession
);

sessionsRouter.post(
  '/sessions/ready',
  authValidation,
  setReady
);

sessionsRouter.post(
  '/sessions/:sessionId',
  connectToSession
);