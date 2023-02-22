import { Router } from 'express';
import { authValidation } from '@/middlewares';

import {
  connectToSession,
  disconnect,
  getSession,
  newSession,
  setReady
} from '@/controllers';

export const sessionsRouter = Router();

sessionsRouter.get(
  '/',
  authValidation,
  getSession
);

sessionsRouter.post(
  '/new',
  newSession
);

sessionsRouter.post(
  '/connect/:sessionId',
  connectToSession
);

sessionsRouter.post(
  '/ready',
  authValidation,
  setReady
);

sessionsRouter.post(
  '/leave',
  authValidation,
  disconnect
);