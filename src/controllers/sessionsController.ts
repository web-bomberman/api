import { Request, Response } from 'express';
import short from 'short-uuid';
import jwt from 'jsonwebtoken';
import { SessionManager, HttpError, LevelManager } from '@/classes';
import { ValidatedTokenPayload } from '@/types';

const SECRET = process.env.JWT_SECRET as string;

export function signToken(player: 1 | 2, session: string) {
  return jwt.sign({ player, session }, SECRET);
}

export function newSession(_req: Request, res: Response) {
  const id = short.generate();
  SessionManager.newSession(id);
  return res.status(201).send({ session: id });
}

export function connectToSession(req: Request, res: Response) {
  const { sessionId } = req.params;
  const session = SessionManager.findSession(sessionId);
  if (!session) throw new HttpError(404);
  if (session.state !== 'room') throw new HttpError(403, 'Game running');
  if (session.player1 === 'waiting') {
    session.player1 = 'not ready';
    const token = signToken(1, sessionId);
    return res.status(200).send({ token, player: 1 });
  } else if (session.player2 === 'waiting') {
    session.player2 = 'not ready';
    const token = signToken(2, sessionId);
    return res.status(200).send({ token, player: 2 });
  } else throw new HttpError(403, 'Session full');
}

export function getSession(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  session.playerPinged(player);
  return res.status(200).send({ game: session.parse(), player });
}

export function pickLevel(req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  session.playerPinged(player);
  if (player !== 1) throw new HttpError(403);
  const { levelName } = req.params;
  const level = LevelManager.findLevel(levelName);
  if (!level) throw new HttpError(404);
  session.setLevel(level.name);
  return res.status(200).send(level.parse());
}

export function setReady(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  session.playerPinged(player);
  if (player === 1 && session.player1 === 'not ready') {
    session.player1 = 'ready';
    return res.status(200).send({ ready: true });
  } else if (player === 1 && session.player1 === 'ready') {
    session.player1 = 'not ready';
    return res.status(200).send({ ready: false });
  } else if (player === 2 && session.player2 === 'not ready') {
    session.player2 = 'ready';
    return res.status(200).send({ ready: true });
  } else if (player === 2 && session.player2 === 'ready') {
    session.player2 = 'not ready';
    return res.status(200).send({ ready: false });
  } else {
    throw new HttpError(403, 'Check connection');
  }
}

export function startGame(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  if (player !== 1) throw new HttpError(401);
  const level = LevelManager.findLevel(session.getLevel());
  if (!level) throw new HttpError(404, 'Level not found');
  session.startGame(level.generateObjects(), level.getSize());
  return res.sendStatus(200);
}

export function disconnect(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  session[`player${player}`] =
    session.state === 'room' ? 'waiting' : 'disconnected';
  return res.sendStatus(200);
}
