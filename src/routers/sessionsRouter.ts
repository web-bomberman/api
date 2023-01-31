import { Router } from 'express';
import { newSession, connectToSession } from '@/controllers';

export const sessionsRouter = Router();

sessionsRouter.post(
  '/sessions/new',
  newSession
);

sessionsRouter.post(
  '/sessions/:sessionId',
  connectToSession
);