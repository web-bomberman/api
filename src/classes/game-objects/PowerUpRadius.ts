import {
  Area,
  GameObject,
  Player
} from '@/classes';

export class PowerUpRadius extends Area {
  constructor() {
    super();
    this.solid = false;
  }

  public parse() {
    return {
      id: this.id,
      type: 'powerup-radius',
      position: this.pos,
      extras: []
    };
  }

  public onObjectEntered(obj: GameObject) {
    if (obj instanceof Player && obj.bombRadius <= 9) obj.bombRadius += 2;
  }

  protected onEnterTree() {}

  protected onExitTree() {}
}