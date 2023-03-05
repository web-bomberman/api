import {
  BlocksExplosion,
  BlocksPiercingExplosion,
  BlocksPlayer,
  GameObject
} from '@/classes';

export class IndestructibleBlock extends GameObject {
  constructor() {
    super();
    this.addComponent(new BlocksPlayer());
    this.addComponent(new BlocksExplosion());
    this.addComponent(new BlocksPiercingExplosion());
  }

  public parse() {
    return {
      id: this.id,
      type: 'indestructible',
      position: this.pos,
      extras: []
    };
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}