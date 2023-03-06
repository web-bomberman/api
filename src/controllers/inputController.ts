import { Request, Response } from 'express';
import { HttpError, Player, Bomb } from '@/classes';
import { ValidatedTokenPayload } from '@/types';

export function inputUp(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = session.getPlayer(player) as Player | null;
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [0, 1]);
  return res.sendStatus(200);
}

export function inputRight(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = session.getPlayer(player) as Player | null;
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [1, 0]);
  return res.sendStatus(200);
}

export function inputDown(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = session.getPlayer(player) as Player | null;
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [0, -1]);
  return res.sendStatus(200);
}

export function inputLeft(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = session.getPlayer(player) as Player | null;
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  session.moveObject(playerObj, [-1, 0]);
  return res.sendStatus(200);
}

export function inputBomb(_req: Request, res: Response) {
  const { player, session } = res.locals as ValidatedTokenPayload;
  const playerObj = session.getPlayer(player) as Player;
  if (!playerObj) throw new HttpError(403, 'Bad game session');
  let bombsOut: number = 0;
  for (const obj of session.getGameObjects()) {
    if (obj instanceof Bomb && obj.player === player) bombsOut++;
  }
  if (bombsOut < playerObj.bombQuantity) {
    const bombObj = new Bomb(
      player,
      playerObj.bombRadius,
      playerObj.nitro
    );
    bombObj.pos = playerObj.pos;
    session.addObject(bombObj);
  }
  return res.sendStatus(200);
}