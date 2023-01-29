import {
  BlocksExplosion,
  BlocksPlayer,
  GameObject,
  GameSession
} from '@/classes';

export class IndestructibleBlock extends GameObject {
  constructor() {
    super();
    this.addComponent(new BlocksPlayer());
    this.addComponent(new BlocksExplosion());
  }

  protected onEnterSession(session: GameSession) {}

  protected onLeaveSession(session: GameSession) {}
}