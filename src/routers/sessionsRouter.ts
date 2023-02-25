import { Router } from 'express';
import { authValidation } from '@/middlewares';

import {
  connectToSession,
  disconnect,
  getSession,
  newSession,
  setReady,
  startGame
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
  '/sessions/connect/:sessionId',
  connectToSession
);

sessionsRouter.post(
  '/sessions/ready',
  authValidation,
  setReady
);

sessionsRouter.post(
  '/sessions/start/:levelName',
  authValidation,
  startGame
);

sessionsRouter.post(
  '/sessions/leave',
  authValidation,
  disconnect
);