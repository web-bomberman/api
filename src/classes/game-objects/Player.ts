import {
  BlocksPlayer,
  Explodable,
  GameObject,
  GameSession,
} from '@/classes';

import { Vector } from '@/types';

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

  protected onEnterSession(session: GameSession) {}

  protected onLeaveSession(session: GameSession) {}

  public move(dist: Vector) {
    const session = this.getSession();
    if (!session) return;
    const newPos: Vector = [this.pos[0] + dist[0], this.pos[1] + dist[1]];
    const objects = session.checkTile(newPos);
    for (const obj of objects) {
      if (BlocksPlayer.blocksPlayer(obj)) return;
    }
    this.pos = newPos;
  }
}