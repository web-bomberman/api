import { Component, GameObject } from '@/classes';

export class Explodable extends Component {
  private explodeFunction: () => void;

  constructor(func: () => void) {
    super();
    this.explodeFunction = func;
  }

  public static isExplodable(obj: GameObject) {
    return !!obj.findComponent('Explodable');
  }

  public static explode(obj: GameObject) {
    const comp = obj.findComponent('Explodable') as Explodable | null;
    if (comp) comp.explodeFunction();
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
