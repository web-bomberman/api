import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Player
} from '@/classes';

export type Tile =
  | 'floor'
  | 'breakable'
  | 'unbreakable'
  | 'player1'
  | 'player2';

export type TileMap = Tile[][];

export class GameSession {
  public readonly room: number;

  private gameObjects: GameObject[] = [];

  constructor(room: number, tilemap: TileMap) {
    this.room = room;
    this.generateLevel(tilemap);
  }

  private generateLevel(tilemap: TileMap) {
    for (let i = 0; i < tilemap.length; i++) {
      for (let j = 0; j < tilemap[i].length; j++) {
        switch (tilemap[i][j]) {
          case 'player1': {
            const obj = new Player(1);
            this.addObject(obj);
            obj.pos = [i, j];
            break;
          }
          case 'player2': {
            const obj = new Player(2);
            this.addObject(obj);
            obj.pos = [i, j];
            break;
          }
          case 'breakable': {
            const obj = new DestructibleBlock();
            this.addObject(obj);
            obj.pos = [i, j];
            break;
          }
          case 'unbreakable': {
            const obj = new IndestructibleBlock();
            this.addObject(obj);
            obj.pos = [i, j];
            break;
          }
        }
      }
    }
  }

  public addObject(obj: GameObject) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i] === obj) return;
    }
    this.gameObjects.push(obj);
    obj.setSession(this);
  }

  public removeObject(obj: GameObject) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i] === obj) {
        this.gameObjects.splice(i, 1);
        obj.removeSelf();
        break;
      }
    }
  }
}