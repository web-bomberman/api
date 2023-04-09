import { BlocksExplosion, BlocksNitro, GameObject } from '@/classes';

export class IndestructibleBlock extends GameObject {
  constructor() {
    super();
    this.addComponent(new BlocksExplosion());
    this.addComponent(new BlocksNitro());
  }

  public parse() {
    return {
      type: 'indestructible',
      position: this.pos,
      extras: [],
    };
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
