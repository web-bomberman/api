import { Area, GameObject, Player } from '@/classes';

export class PowerUpRadius extends Area {
  constructor() {
    super();
  }

  public parse() {
    return {
      type: 'powerup-radius',
      position: this.pos,
      extras: [],
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player) {
      if (obj.bombRadius < 11) obj.bombRadius += 2;
      this.getSession().updateParsedTable(obj);
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
