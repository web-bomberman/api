export type Vector = [number, number];

export type Tile =
  | '_'
  | 'X'
  | '#'
  | '1'
  | '2';

export type TileMap = Tile[][];