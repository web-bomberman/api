import {
  BlocksExplosion,
  BlocksPlayer,
  Explodable,
  GameSession,
  GameObject,
  Vector
} from '@/classes';

export class DestructibleBlock extends GameObject {
  constructor(position: Vector, session: GameSession) {
    super(position, session);
    this.components.push(new BlocksPlayer(this));
    this.components.push(new BlocksExplosion(this));
    this.components.push(new Explodable(
      this,
      () => this.deleteSelf()
    ));
  }
}