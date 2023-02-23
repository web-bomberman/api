import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Player
} from '@/classes';

import {
  ParsedTile,
  TileMap,
  Vector
} from '@/types';

export class Level {
  public name: string;

  private tilemap: TileMap;
  private size: Vector;

  constructor(name: string, tilemap: TileMap) {
    this.name = name;
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

  public parse() {
    const objects: ParsedTile[] = [];
    for (let i = 0; i <= this.size[0]; i++) {
      for (let j = 0; j <= this.size[1]; j++) {
        switch (this.tilemap[i][j]) {
          case '_': {
            break;
          }
          case '#': {
            objects.push({
              object: 'indestructible',
              position: [j, this.size[0] - i]
            });
            break;
          }
          case 'X': {
            objects.push({
              object: 'destructible',
              position: [j, this.size[0] - i]
            });
            break;
          }
          case '1': {
            objects.push({
              object: 'player1',
              position: [j, this.size[0] - i]
            });
            break;
          }
          case '2': {
            objects.push({
              object: 'player2',
              position: [j, this.size[0] - i]
            });
            break;
          }
        }
      }
    }
    return objects;
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