import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/classes';

const SECRET = process.env.JWT_SECRET as string;

function validateToken(
  token: string
) {
  try {
    const payload = jwt.verify(token, SECRET);
    return;
  } catch (err) {
    throw new HttpError(401);
  }
}

export async function authValidation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) throw new HttpError(401);
  const auth: string = req.headers.authorization;
  if (auth.slice(0, 7) != 'Bearer ') throw new HttpError(401);
  validateToken(auth.replace('Bearer ', ''));
  next();
}