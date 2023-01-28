import {
  BlocksPlayer,
  Explodable,
  GameObject,
  GameSession,
  Vector
} from '@/classes';

export class Player extends GameObject {
  public readonly player: 1 | 2;

  private constructor(player: 1 | 2, session: GameSession) {
    super(session);
    this.player = player;
  }

  public static create(session: GameSession, player: 1 | 2) {
    const newObj = new Player(player, session);
    session.addObject(newObj);
    newObj.initialize();
  }

  public move(distance: Vector) {
    // aldkfj
  }
}