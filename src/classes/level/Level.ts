import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Player
} from '@/classes';

import {
  TileMap,
  Vector
} from '@/types';

export class Level {
  private tilemap: TileMap;
  private size: Vector;

  constructor(tilemap: TileMap) {
    this.tilemap = tilemap;
    this.size = [tilemap[0].length - 1, tilemap.length - 1];
  }

  public getTileMap() {
    const map: TileMap = [];
    for (let i = 0; i < this.size[0]; i++) {
      map.push([]);
      for (let j = 0; j < this.size[1]; j++) {
        map[i].push(this.tilemap[j][ this.size[0] - i]);
      }
    }
    return map;
  }

  public getSize() {
    return this.size;
  }

  public generateObjects() {
    const objects: GameObject[] = [];
    for (let i = 0; i <= this.size[0]; i++) {
      for (let j = 0; j <= this.size[1]; j++) {
        switch (this.tilemap[i][j]) {
          case '_': {
            break;
          }
          case '#': {
            const obj = new IndestructibleBlock();
            obj.pos = [j, this.size[0] - i];
            objects.push(obj);
            break;
          }
          case 'X': {
            const obj = new DestructibleBlock();
            obj.pos = [j, this.size[0] - i];
            objects.push(obj);
            break;
          }
          case '1': {
            const obj = new Player(1);
            obj.pos = [j, this.size[0] - i];
            objects.push(obj);
            break;
          }
          case '2': {
            const obj = new Player(2);
            obj.pos = [j, this.size[0] - i];
            objects.push(obj);
            break;
          }
        }
      }
    }
    return objects;
  }
}