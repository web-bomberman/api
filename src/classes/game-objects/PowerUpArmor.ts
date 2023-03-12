import { Area, GameObject, Player } from '@/classes';

export class PowerUpArmor extends Area {
  constructor() {
    super();
  }

  public parse() {
    return {
      id: this.id,
      type: 'powerup-armor',
      position: this.pos,
      extras: [],
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player) {
      obj.armor = true;
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
