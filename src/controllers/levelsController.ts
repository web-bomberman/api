import { Request, Response } from 'express';
import { LevelManager } from '@/classes';

export function getLevels(_req: Request, res: Response) {
  const levels = LevelManager.getLevels();
  const parsedLevels = [];
  for (const level of levels) {
    parsedLevels.push(level.parse());
  }
  return res.status(200).send(levels);
}