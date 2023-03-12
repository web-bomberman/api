import { Component, GameObject } from '@/classes';

export class BlocksNitro extends Component {
  constructor() {
    super();
  }

  public static blocksNitro(obj: GameObject) {
    for (const comp of obj.getComponents()) {
      if (comp instanceof BlocksNitro) return true;
    }
    return false;
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
