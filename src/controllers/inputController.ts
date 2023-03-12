import { Request, Response } from 'express';
import { HttpError, Player } from '@/classes';
import { ValidatedTokenPayload } from '@/types';

export function inputUp(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = Player.findPlayer(player, session);
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [0, 1]);
  return res.sendStatus(200);
}

export function inputRight(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = Player.findPlayer(player, session);
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [1, 0]);
  return res.sendStatus(200);
}

export function inputDown(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = Player.findPlayer(player, session);
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [0, -1]);
  return res.sendStatus(200);
}

export function inputLeft(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = Player.findPlayer(player, session);
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [-1, 0]);
  return res.sendStatus(200);
}

export function inputBomb(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = Player.findPlayer(player, session);
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  playerObj.dropBomb();
  return res.sendStatus(200);
}
