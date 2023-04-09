import { Area, GameObject, Player } from '@/classes';

export class PowerUpNitro extends Area {
  constructor() {
    super();
  }

  public parse() {
    return {
      type: 'powerup-nitro',
      position: this.pos,
      extras: [],
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player) {
      obj.nitro = true;
      this.getSession().updateParsedTable(obj);
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}
