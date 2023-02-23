import {
  BlocksPlayer,
  Explodable,
  GameObject
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

  public move(dist: Vector) {
    const session = this.getSession();
    if (!session) return;
    const newPos: Vector = [this.pos[0] + dist[0], this.pos[1] + dist[1]];
    if (
      newPos[0] <= 0 ||
      newPos[1] <= 0 ||
      newPos[0] > session.getSize()[0] ||
      newPos[1] > session.getSize()[1]
    ) return;
    const objects = session.checkTile(newPos);
    for (const obj of objects) {
      if (BlocksPlayer.blocksPlayer(obj)) return;
    }
    this.pos = newPos;
  }

  public parse() {
    return {
      id: this.id,
      type: `player${this.player}`,
      position: this.pos,
      extras: []
    };
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}