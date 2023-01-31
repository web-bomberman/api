import { Request, Response } from 'express';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { SessionManager, HttpError } from '@/classes';

const SECRET = process.env.JWT_SECRET as string;

export function newSession(_req: Request, res: Response) {
  const id = v4();
  SessionManager.newSession(id);
  return res.status(201).send({ session: id });
}

export function connectToSession(req: Request, res: Response) {
  const { sessionId } = req.params;
  const session = SessionManager.findSession(sessionId);
  if (!session) throw new HttpError(404)
  if (session.player1 === 'waiting') {
    session.player1 = 'not ready';
    const token = jwt.sign(
      { 
        player: 1,
        session: sessionId
      },
      SECRET
    );
    return res.status(200).send({ token });
  }
  else if (session.player2 === 'waiting') {
    session.player2 = 'not ready';
    const token = jwt.sign(
      { 
        player: 2,
        session: sessionId
      },
      SECRET
    );
    return res.status(200).send({ token });
  }
  else throw new HttpError(403, 'Session full');
}