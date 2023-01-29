import {
  BlocksPlayer,
  Explodable,
  GameObject,
  Vector
} from '@/classes';

export class Player extends GameObject {
  public readonly player: 1 | 2;

  constructor(player: 1 | 2) {
    super();
    this.player = player;
    this.addComponent(new BlocksPlayer());
    this.addComponent(new Explodable(
      () => console.log(`Player ${this.player} died!`)
    ));
  }

  public move(distance: Vector) {
    // aldkfj
  }
}