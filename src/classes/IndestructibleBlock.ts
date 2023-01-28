import {
  BlocksExplosion,
  BlocksPlayer,
  Game,
  GameObject,
  Vector
} from '@/classes';

export class IndestructibleBlock extends GameObject {
  constructor(position: Vector, game: Game) {
    super(position, game);
    this.components.push(new BlocksPlayer(this));
    this.components.push(new BlocksExplosion(this));
  }
}