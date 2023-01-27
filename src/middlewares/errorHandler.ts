import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/classes';

export async function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    if (err.message) res.status(err.status).send(err.message);
    else res.sendStatus(err.status);
    return;
  }

  console.log(err);
  return res.sendStatus(500);
}