export type Vector = [number, number];

export type Tile = '_' | 'X' | '#' | '1' | '2';

export type TileMap = readonly Tile[][];

export type SessionState = 
  | 'room'
  | 'starting'
  | 'running'
  | 'over';

export type PlayerState =
  | 'waiting'
  | 'not ready'
  | 'ready'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';