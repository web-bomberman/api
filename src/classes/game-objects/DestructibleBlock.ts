import {
  BlocksExplosion,
  BlocksPlayer,
  Explodable,
  GameObject,
  GameSession
} from '@/classes';

export class DestructibleBlock extends GameObject {
  constructor() {
    super();
    this.addComponent(new BlocksPlayer());
    this.addComponent(new BlocksExplosion());
    this.addComponent(new Explodable(
      () => this.removeSelf()
    ));
  }

  protected onEnterSession(session: GameSession) {}

  protected onLeaveSession(session: GameSession) {}
}