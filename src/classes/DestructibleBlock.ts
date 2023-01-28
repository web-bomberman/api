import {
  BlocksExplosion,
  BlocksPlayer,
  Explodable,
  Game,
  GameObject,
  Vector
} from '@/classes';

export class DestructibleBlock extends GameObject {
  constructor(position: Vector, game: Game) {
    super(position, game);
    this.components.push(new BlocksPlayer(this));
    this.components.push(new BlocksExplosion(this));
    this.components.push(new Explodable(
      this,
      () => this.deleteSelf()
    ));
  }
}