import {
  DestructibleBlock,
  GameObject,
  IndestructibleBlock,
  Player,
  PowerUpArmor,
  PowerUpBombs,
  PowerUpNitro,
  PowerUpRadius
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
    this.size = [tilemap[0].length, tilemap.length];
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
    for (let i = 0; i < this.size[0]; i++) {
      for (let j = 0; j < this.size[1]; j++) {
        switch (this.tilemap[j][i]) {
          case '_': {
            break;
          }
          case '#': {
            objects.push({
              object: 'indestructible',
              position: [i + 1, j + 1]
            });
            break;
          }
          case 'X': {
            objects.push({
              object: 'destructible',
              position: [i + 1, j + 1]
            });
            break;
          }
          case '1': {
            objects.push({
              object: 'player1',
              position: [i + 1, j + 1]
            });
            break;
          }
          case '2': {
            objects.push({
              object: 'player2',
              position: [i + 1, j + 1]
            });
            break;
          }
        }
      }
    }
    return {
      name: this.name,
      size: this.size,
      objects
    };
  }

  public generateObjects() {
    const returnValue: {
      objects: GameObject[],
      player1: Player | null,
      player2: Player | null
    } = {
      objects: [],
      player1: null,
      player2: null
    };
    const leftWalls: Vector[] = [];
    const rightWalls: Vector[] = [];
    for (let i = 0; i < this.size[0]; i++) {
      for (let j = 0; j < this.size[1]; j++) {
        switch (this.tilemap[j][i]) {
          case '_': {
            break;
          }
          case '#': {
            const obj = new IndestructibleBlock();
            obj.pos = [i + 1, this.size[1] - j];
            returnValue.objects.push(obj);
            break;
          }
          case 'X': {
            const obj = new DestructibleBlock();
            obj.pos = [i + 1, this.size[1] - j];
            if (i + 1 <= Math.floor(this.size[0] / 2)) {
              leftWalls.push([i + 1, this.size[1] - j]);
            } else {
              rightWalls.push([i + 1, this.size[1] - j]);
            }
            returnValue.objects.push(obj);
            break;
          }
          case '1': {
            const obj = new Player(1);
            obj.pos = [i + 1, this.size[1] - j];
            returnValue.objects.push(obj);
            returnValue.player1 = obj;
            break;
          }
          case '2': {
            const obj = new Player(2);
            obj.pos = [i + 1, this.size[1] - j];
            returnValue.objects.push(obj);
            returnValue.player2 = obj;
            break;
          }
        }
      }
    }
    for (let i = 0; i < 8; i++) {
      let leftPowerUp: GameObject;
      const leftRNG = Math.floor(Math.random() * leftWalls.length);
      if (i < 3) leftPowerUp = new PowerUpBombs();
      else if (i < 6) leftPowerUp = new PowerUpRadius();
      else if (i === 6) leftPowerUp = new PowerUpArmor();
      else leftPowerUp = new PowerUpNitro();
      leftPowerUp.pos = leftWalls.splice(leftRNG, 1)[0];
      returnValue.objects.push(leftPowerUp);
      let rightPowerUp: GameObject;
      const rightRNG = Math.floor(Math.random() * rightWalls.length);
      if (i < 3) rightPowerUp = new PowerUpBombs();
      else if (i < 6) rightPowerUp = new PowerUpRadius();
      else if (i === 6) rightPowerUp = new PowerUpArmor();
      else rightPowerUp = new PowerUpNitro();
      rightPowerUp.pos = rightWalls.splice(rightRNG, 1)[0];
      returnValue.objects.push(rightPowerUp);
    }
    return returnValue;
  }
}