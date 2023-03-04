import {
  BlocksPlayer,
  Explodable,
  GameObject
} from '@/classes';

export class Bomb extends GameObject {
  public readonly player: 1 | 2;
  public readonly range: number;
  public readonly piercing: boolean;

  private explodeTimeout: NodeJS.Timeout | null = null;

  constructor(player: 1 | 2, range: number, piercing: boolean) {
    super();
    this.player = player;
    this.range = range;
    this.piercing = piercing;
    this.addComponent(new BlocksPlayer());
    this.addComponent(new Explodable(() => {
      this.removeSelf();
    }));
  }

  protected onEnterTree() {
    this.explodeTimeout = setTimeout(() => Explodable.explode(this), 5000);
  }

  protected onExitTree() {
    if (this.explodeTimeout) clearTimeout(this.explodeTimeout);
  }

  public parse() {
    return {
      id: this.id,
      type: `bomb`,
      position: this.pos,
      extras: []
    };
  }
};