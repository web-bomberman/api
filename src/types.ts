export type Vector = [number, number];

export type Tile =
  | 'floor'
  | 'breakable'
  | 'unbreakable'
  | 'player1'
  | 'player2';

export type TileMap = Tile[][];