import { BlocksExplosion, Explodable, GameObject } from '@/classes';

export class DestructibleBlock extends GameObject {
  constructor() {
    super();
    this.addComponent(new BlocksExplosion());
    this.addComponent(new Explodable(() => this.removeSelf()));
  }

  public parse() {
    return {
      id: this.id,
      type: 'destructible',
      position: this.pos,
      extras: [],
    };
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
