import { Request, Response } from 'express';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

import {
  SessionManager,
  HttpError
} from '@/classes';

import { ValidatedTokenPayload } from '@/types';

const SECRET = process.env.JWT_SECRET as string;

export function signToken(player: 1 | 2, session: string) {
  return jwt.sign({ player, session }, SECRET);
}

export function newSession(_req: Request, res: Response) {
  const id = v4();
  SessionManager.newSession(id);
  return res.status(201).send({ session: id });
}

export function connectToSession(req: Request, res: Response) {
  const { sessionId } = req.params;
  const session = SessionManager.findSession(sessionId);
  if (!session) throw new HttpError(404)
  if (session.state !== 'room') throw new HttpError(403, 'Game running');
  if (session.player1 === 'waiting') {
    session.player1 = 'not ready';
    const token = signToken(1, sessionId);
    return res.status(200).send({ token });
  } else if (session.player2 === 'waiting') {
    session.player2 = 'not ready';
    const token = signToken(2, sessionId);
    return res.status(200).send({ token });
  } else throw new HttpError(403, 'Session full');
}

export function getSession(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  session.playerPinged(player);
  return res.status(200).send(session.parse());
}