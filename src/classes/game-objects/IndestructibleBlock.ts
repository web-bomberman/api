import {
  BlocksExplosion,
  BlocksPlayer,
  GameObject,
} from '@/classes';

export class IndestructibleBlock extends GameObject {
  constructor() {
    super();
    this.addComponent(new BlocksPlayer());
    this.addComponent(new BlocksExplosion());
  }
}