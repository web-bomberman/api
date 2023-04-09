import { Area, GameObject, Player } from '@/classes';

export class PowerUpBombs extends Area {
  constructor() {
    super();
  }

  public parse() {
    return {
      type: 'powerup-bombs',
      position: this.pos,
      extras: [],
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player) {
      if (obj.bombQuantity < 6) obj.bombQuantity += 1;
      this.getSession().updateParsedTable(obj);
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
