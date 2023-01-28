import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Level,
  Player
} from '@/classes';

export class GameSession {
  public readonly room: number;
  public readonly level: Readonly<Level>;

  private _gameObjects: GameObject[];
  public get gameObjects(): readonly GameObject[] {
    return this._gameObjects;
  }

  constructor(room: number, level: Level) {
    this.room = room;
    this.level = level;
    this._gameObjects = [];
    this.generateLevel();
  }

  private generateLevel() {
    const tilemap = this.level.tilemap;
    for (let i = 0; i < tilemap.length; i++) {
      for (let j = 0; j < tilemap[i].length; j++) {
        switch (tilemap[i][j]) {
          case 'player1':
            this._gameObjects.push(new Player(1, [i, j], this));
            break;
          case 'player2':
            this._gameObjects.push(new Player(2, [i, j], this));
            break;
          case 'breakable':
            this._gameObjects.push(new DestructibleBlock([i, j], this));
            break;
          case 'unbreakable':
            this._gameObjects.push(new IndestructibleBlock([i, j], this));
            break;
        }
      }
    }
  }

  public addObject(obj: GameObject) {
    if (obj.initialized) {
      throw new Error("Can't call addObject() outside create() methods.");
    }
    this._gameObjects.push(obj);
  }

  public removeObject(obj: GameObject) {
    for (let i = 0; i < this._gameObjects.length; i++) {
      if (Object.is(this._gameObjects[i], obj)) {
        this._gameObjects.splice(i, 1);
        break;
      }
    }
  }

}