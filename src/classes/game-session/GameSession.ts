import { v4 } from 'uuid';

import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Player
} from '@/classes';

import {
  Vector,
  TileMap
} from '@/types';

export class GameSession {
  public readonly id: string;

  private gameObjects: GameObject[] = [];
  private gameObjectIds: number[] = [];
  private objectIdCount: number = 0;

  constructor(tilemap: TileMap) {
    this.id = v4();
    this.generateLevel(tilemap);
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