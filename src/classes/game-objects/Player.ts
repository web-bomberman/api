import { Bomb, Explodable, GameObject, GameSession } from '@/classes';

export class Player extends GameObject {
  public readonly player: 1 | 2;
  public bombRadius: number = 1;
  public bombQuantity: number = 1;
  public nitro: boolean = false;
  public armor: boolean = false;

  private dead: boolean = false;

  private static players: {
    [sessionId: string]: { 1: Player | null; 2: Player | null };
  } = {};

  constructor(player: 1 | 2) {
    super();
    this.player = player;
    this.addComponent(
      new Explodable(() => {
        if (this.armor) {
          setTimeout(() => {
            this.armor = false;
            this.getSession().updateParsedTable(this);
          }, 100);
        } else {
          this.dead = true;
          setTimeout(() => {
            const session = this.getSession();
            const player1 = Player.findPlayer(1, session);
            const player2 = Player.findPlayer(2, session);
            if (!player1 || !player2) return;
            if (player1.dead && player2.dead) session.stopGame('draw');
            else if (player1.dead && !player2.dead) session.stopGame(2);
            else if (!player1.dead && player2.dead) session.stopGame(1);
          }, 100);
        }
      })
    );
  }

  public parse() {
    return {
      type: `player${this.player}`,
      position: this.pos,
      extras: [
        `bomb-radius: ${this.bombRadius}`,
        `bomb-quantity: ${this.bombQuantity}`,
        `nitro-bombs: ${this.nitro}`,
        `protective-armor: ${this.armor}`,
      ],
    };
  }

  public dropBomb() {
    let bombsOut: number = 0;
    for (const obj of this.getSession().getGameObjects()) {
      if (obj instanceof Bomb && obj.player === this.player) bombsOut++;
    }
    if (bombsOut < this.bombQuantity) {
      const bomb = new Bomb(this.player, this.bombRadius, this.nitro);
      bomb.pos = this.pos;
      this.getSession().addObject(bomb);
    }
  }

  public static findPlayer(player: 1 | 2, session: GameSession) {
    if (!this.players[session.id]) {
      this.players[session.id] = { 1: null, 2: null };
      for (const obj of session.getGameObjects()) {
        if (obj instanceof Player) {
          this.players[session.id][obj.player] = obj;
        }
      }
      setInterval(() => {
        delete this.players[session.id];
      }, 10000);
    }
    return this.players[session.id][player];
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
