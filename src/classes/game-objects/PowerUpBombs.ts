import {
  Area,
  GameObject,
  Player
} from '@/classes';

export class PowerUpBombs extends Area {
  constructor() {
    super();
    this.solid = false;
  }

  public parse() {
    return {
      id: this.id,
      type: 'powerup-bombs',
      position: this.pos,
      extras: []
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player && obj.bombQuantity <= 5) {
      obj.bombQuantity += 1;
      this.removeSelf();
    }
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}