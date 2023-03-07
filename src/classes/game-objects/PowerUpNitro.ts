import {
  Area,
  GameObject,
  Player
} from '@/classes';

export class PowerUpNitro extends Area {
  constructor() {
    super();
    this.solid = false;
  }

  public parse() {
    return {
      id: this.id,
      type: 'powerup-nitro',
      position: this.pos,
      extras: []
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player) {
      obj.nitro = true;
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}