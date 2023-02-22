import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError, SessionManager } from '@/classes';
import { TokenPayload } from '@/types';

const SECRET = process.env.JWT_SECRET as string;

function validateToken(token: string) {
  try {
    const payload = jwt.verify(token, SECRET) as TokenPayload;
    const session = SessionManager.findSession(payload.session);
    if (!session) throw new HttpError(404);
    return { player: payload.player, session };
  } catch (err) {
    throw new HttpError(401);
  }
}

export async function authValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) throw new HttpError(401);
  const auth: string = req.headers.authorization;
  if (auth.slice(0, 7) != 'Bearer ') throw new HttpError(401);
  const { player, session } = validateToken(auth.replace('Bearer ', ''));
  if (
    player === 1 && session.player1 === 'disconnected' ||
    player === 2 && session.player2 === 'disconnected'
  ) {
    throw new HttpError(403, 'Session over');
  }
  res.locals.player = player;
  res.locals.session = session;
  return next();
}