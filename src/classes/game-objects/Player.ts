import {
  Explodable,
  GameObject,
} from '@/classes';

export class Player extends GameObject {
  public readonly player: 1 | 2;
  public bombRadius: number = 3;
  public bombQuantity: number = 1;
  public nitro: boolean = false;
  public armor: boolean = false;

  private dead: boolean = false;

  constructor(player: 1 | 2) {
    super();
    this.player = player;
    this.addComponent(new Explodable(() => {
      if (this.armor) this.armor = false;
      else {
        this.getSession().stopGame(this.player === 1 ? 2 : 1);
        this.dead = true;
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
    if (this.dead) extras.push('dead');
    return {
      id: this.id,
      type: `player${this.player}`,
      position: this.pos,
      extras
    };
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}