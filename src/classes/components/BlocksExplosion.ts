import { Component, GameObject } from '@/classes';

export class BlocksExplosion extends Component {
  constructor() {
    super();
  }

  public static blocksExplosion(obj: GameObject) {
    for (const comp of obj.getComponents()) {
      if (comp instanceof BlocksExplosion) {
        return true;
      }
    }
    return false;
  }
}