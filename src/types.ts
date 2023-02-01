import { GameSession } from '@/classes';

export type ParsedGameObject = {
  type: string;
  extras: string[];
}

export type ParsedGameObjectWithID = {
  id: number;
  type: string;
  extras: string[];
}

export type ParsedGameSession = {
  id: string;
  state: SessionState;
  player1: PlayerState;
  player2: PlayerState;
  gameObjects: ParsedGameObjectWithID[];
}

export type PlayerState =
| 'waiting'
| 'not ready'
| 'ready'
| 'connected'
| 'reconnecting'
| 'disconnected';

export type SessionState = 
  | 'room'
  | 'starting'
  | 'running'
  | 'over';

export type Tile = '_' | 'X' | '#' | '1' | '2';

export type TileMap = readonly Tile[][];

export type TokenPayload = {
  player: 1 | 2;
  session: string;
}

export type ValidatedTokenPayload = {
  player: 1 | 2;
  session: GameSession;
}

export type Vector = [number, number];