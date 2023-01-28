import {
  GameObject,
  Level
} from '@/classes';

export class Game {
  public readonly room: number;
  public readonly level: Level;
  public readonly gameObjects: GameObject[];

  constructor(room: number, level: Level) {
    this.room = room;
    this.level = level;
    this.gameObjects = [];
  }
}