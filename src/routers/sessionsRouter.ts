import { Router } from 'express';
import { newSession, connectToSession, getSession } from '@/controllers';
import { authValidation } from '@/middlewares';

export const sessionsRouter = Router();

sessionsRouter.post(
  '/sessions/new',
  newSession
);

sessionsRouter.post(
  '/sessions/:sessionId',
  connectToSession
);

sessionsRouter.get(
  'sessions/:sessionId',
  authValidation,
  getSession
)