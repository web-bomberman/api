export type Tile =
  | 'floor'
  | 'breakable'
  | 'unbreakable'
  | 'player1'
  | 'player2';

export type TileMap = Tile[][];

export class Level {
  readonly tilemap: TileMap;

  constructor(tilemap: TileMap) {
    this.tilemap = tilemap;
  }
}