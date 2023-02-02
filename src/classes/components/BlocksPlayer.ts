import { Component, GameObject } from '@/classes';

export class BlocksPlayer extends Component {
  constructor() {
    super();
  }

  public static blocksPlayer(obj: GameObject) {
    for (const comp of obj.getComponents()) {
      if (comp instanceof BlocksPlayer) {
        return true;
      }
    }
    return false;
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}