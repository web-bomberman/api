import { Component, Game } from '@/classes';

export type Vector = [number, number];

export abstract class GameObject {
  public pos: Vector;
  public readonly components: Component[];
  public readonly game: Game;

  constructor(pos: Vector, game: Game) {
    this.pos = pos;
    this.components = [];
    this.game = game;
  }

  public addComponent(comp: Component) {
    this.components.push(comp);
  }

  public findComponent(name: string) {
    for (const comp of this.components) {
      if (comp.constructor.name === name) return comp;
    }
    return null;
  }

  public removeComponent(name: string) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i].constructor.name === name) {
        this.components.splice(i, 1);
        break;
      }
    }
  }

  public deleteSelf() {
    const gameObjects = this.game.gameObjects;
    for (let i = 0; i < gameObjects.length; i++) {
      if (Object.is(gameObjects[i], this)) {
        gameObjects.splice(i, 1);
        break;
      }
    }
  }
}