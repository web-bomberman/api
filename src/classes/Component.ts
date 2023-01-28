import { GameObject } from '@/classes';

export abstract class Component {
  private gameObject: { ref: GameObject };

  constructor(gameObject: GameObject) {
    this.gameObject = { ref: gameObject };
  }

  public getGameObject() {
    return this.gameObject.ref;
  }
}