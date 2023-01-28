import { GameObject } from '@/classes';

export abstract class Component {
  private readonly gameObject: GameObject;

  constructor(gameObject: GameObject) {
    this.gameObject = gameObject;
  }

  public getGameObject() {
    return this.gameObject;
  }

  public deleteSelf() {
    const components = this.getGameObject().components;
    for (let i = 0; i < components.length; i++) {
      if (Object.is(components[i], this)) {
        components.splice(i, 1);
        break;
      }
    }
  }
}