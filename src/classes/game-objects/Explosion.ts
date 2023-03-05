import {
  Explodable,
  GameObject
} from '@/classes';

import { ExplosionTypes } from '@/types';

export class Explosion extends GameObject {
  private type: ExplosionTypes;
  private timeout: NodeJS.Timeout | null = null;

  constructor(type: ExplosionTypes) {
    super();
    this.type = type;
  }

  protected onEnterTree() {
    this.timeout = setTimeout(() => this.removeSelf(), 1000);
    for (const obj of this.getSession().checkTile(this.pos)) {
      Explodable.explode(obj);
    }
  }

  protected onExitTree() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  public parse() {
    return {
      id: this.id,
      type: 'explosion',
      position: this.pos,
      extras: [this.type]
    };
  }
}