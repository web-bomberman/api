import { Component, GameObject } from '@/classes';

export class BlocksExplosion extends Component {
  constructor(gameObject: GameObject) {
    super(gameObject);
  }

  public static blocksExplosion(gameObject: GameObject) {
    for (const comp of gameObject.components) {
      if (comp instanceof BlocksExplosion) {
        return true;
      }
    }
    return false;
  }
}