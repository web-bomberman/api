import { Area, GameObject, Player } from '@/classes';

export class PowerUpArmor extends Area {
  constructor() {
    super();
  }

  public parse() {
    return {
      type: 'powerup-armor',
      position: this.pos,
      extras: [],
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player) {
      obj.armor = true;
      this.getSession().updateParsedTable(obj);
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
