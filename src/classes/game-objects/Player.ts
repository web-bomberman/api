import {
  Bomb,
  Explodable,
  GameObject
} from '@/classes';

export class Player extends GameObject {
  public readonly player: 1 | 2;
  public bombRadius: number = 1;
  public bombQuantity: number = 1;
  public nitro: boolean = false;
  public armor: boolean = false;

  constructor(player: 1 | 2) {
    super();
    this.player = player;
    this.addComponent(new Explodable(() => {
      if (this.armor) this.armor = false;
      else {
        this.getSession().stopGame(this.player === 1 ? 2 : 1);
      }
    }));
  }

  public parse() {
    const extras = [
      `bomb-radius: ${this.bombRadius}`,
      `bomb-quantity: ${this.bombQuantity}`,
      `nitro-bombs: ${this.nitro}`,
      `protective-armor: ${this.armor}`,
    ];
    return {
      id: this.id,
      type: `player${this.player}`,
      position: this.pos,
      extras
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

  protected onEnterTree() {}

  protected onExitTree() {}
}