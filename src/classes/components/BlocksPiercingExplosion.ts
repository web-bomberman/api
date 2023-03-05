import { Component, GameObject } from '@/classes';

export class BlocksPiercingExplosion extends Component {
  constructor() {
    super();
  }

  public static blocksPiercingExplosion(obj: GameObject) {
    for (const comp of obj.getComponents()) {
      if (comp.constructor.name === 'BlocksPiercingExplosion') return true;
    }
    return false;
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}