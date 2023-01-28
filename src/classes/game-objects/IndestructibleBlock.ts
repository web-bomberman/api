import {
  BlocksExplosion,
  BlocksPlayer,
  GameSession,
  GameObject,
  Vector
} from '@/classes';

export class IndestructibleBlock extends GameObject {
  constructor(position: Vector, session: GameSession) {
    super(position, session);
    this.components.push(new BlocksPlayer(this));
    this.components.push(new BlocksExplosion(this));
  }
}