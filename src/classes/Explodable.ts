import { Component, GameObject } from '@/classes';

export class Explodable extends Component {
  private explodeFunc: () => void;

  constructor(gameObject: GameObject, func: () => void) {
    super(gameObject);
    this.explodeFunc = func;
  }

  public static isExplodable(gameObject: GameObject) {
    for (const comp of gameObject.components) {
      if (comp instanceof Explodable) {
        return true;
      }
    }
    return false;
  }

  public static explode(gameObject: GameObject) {
    for (const comp of gameObject.components) {
      if (comp instanceof Explodable) {
        comp.explodeFunc();
      }
    }
  }
}