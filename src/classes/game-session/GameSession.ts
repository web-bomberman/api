import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Player
} from '@/classes';

import {
  ParsedGameSession,
  PlayerState,
  SessionState,
  TileMap,
  Vector
} from '@/types';

export class GameSession {
  public readonly id: string;

  public state: SessionState;
  public player1: PlayerState;
  public player2: PlayerState;

  private gameObjects: GameObject[] = [];
  private gameObjectIds: number[] = [];
  private objectIdCount: number = 0;
  private durationSeconds: number = 0;
  private secondsP1LastPing: number = 0;
  private secondsP2LastPing: number = 0;

  constructor(id: string) {
    this.id = id;
    this.state = 'room';
    this.player1 = 'waiting';
    this.player2 = 'waiting';
  }

  public addObject(obj: GameObject) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i] === obj) return;
    }
    this.gameObjects.push(obj);
    this.gameObjectIds.push(this.objectIdCount);
    this.objectIdCount++;
    obj.setSession(this);
  }

  public removeObject(obj: GameObject) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i] === obj) {
        this.gameObjects.splice(i, 1);
        this.gameObjectIds.splice(i, 1);
        obj.removeSelf();
        break;
      }
    }
  }

  public playerPinged(player: 1 | 2) {
    if (player === 1) this.secondsP1LastPing = 0;
    else if (player === 2) this.secondsP2LastPing = 0;
  }

  public parse() {
    const parsed: ParsedGameSession = {
      id: this.id,
      state: this.state,
      player1: this.player1,
      player2: this.player2,
      gameObjects: []
    };
    for (let i = 0; i < this.gameObjects.length; i++) {
      parsed.gameObjects.push({
        id: this.gameObjectIds[i],
        ...this.gameObjects[i].parse()
      });
    }
  }

  public startGame(tilemap: TileMap) {
    this.generateLevel(tilemap);
    this.state === 'starting';
    this.player1 === 'connected';
    this.player2 === 'connected';
  }

  private generateLevel(tilemap: TileMap) {
    for (let i = 0; i < tilemap.length; i++) {
      for (let j = 0; j < tilemap[i].length; j++) {
        switch (tilemap[i][j]) {
          case '1': {
            const obj = new Player(1);
            obj.pos = [tilemap[i].length - j, i];
            this.addObject(obj);
            break;
          }
          case '2': {
            const obj = new Player(2);
            obj.pos = [tilemap[i].length - j, i];
            this.addObject(obj);
            break;
          }
          case 'X': {
            const obj = new DestructibleBlock();
            obj.pos = [tilemap[i].length - j, i];
            this.addObject(obj);
            break;
          }
          case '#': {
            const obj = new IndestructibleBlock();
            obj.pos = [tilemap[i].length - j, i];
            this.addObject(obj);
            break;
          }
        }
      }
    }
  }

  public checkTile(pos: Vector) {
    const objects: GameObject[] = [];
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i].pos === pos) objects.push(this.gameObjects[i]);
    }
    return objects;
  }
}