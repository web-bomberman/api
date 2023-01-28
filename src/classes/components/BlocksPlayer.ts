import { Component, GameObject } from '@/classes';

export class BlocksPlayer extends Component {
  constructor(gameObject: GameObject) {
    super(gameObject);
  }

  public static blocksPlayer(gameObject: GameObject) {
    for (const comp of gameObject.components) {
      if (comp instanceof BlocksPlayer) {
        return true;
      }
    }
    return false;
  }
}