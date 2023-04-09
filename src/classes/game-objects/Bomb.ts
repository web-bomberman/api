import {
  BlocksExplosion,
  BlocksNitro,
  Explodable,
  Explosion,
  GameObject,
} from '@/classes';

import { ExplosionTypes, Vector } from '@/types';

export class Bomb extends GameObject {
  public readonly player: 1 | 2;
  public readonly radius: number;
  public readonly nitro: boolean;

  private explodeTimeout: NodeJS.Timeout | null = null;

  constructor(player: 1 | 2, radius: number, nitro: boolean) {
    super();
    this.player = player;
    this.radius = radius;
    this.nitro = nitro;
    this.addComponent(
      new Explodable(() => {
        const session = this.getSession(); // recording these values
        const pos = this.pos; // so we can access them
        const radius = this.radius; // after object is removed
        const nitro = this.nitro;
        this.removeSelf();
        const centerExplosion = new Explosion('center');
        centerExplosion.pos = this.pos;
        session.addObject(centerExplosion);
        for (const direction of ['up', 'right', 'down', 'left']) {
          const dir = {
            up: [0, 1],
            right: [1, 0],
            down: [0, -1],
            left: [-1, 0],
          }[direction] as Vector;
          const type = {
            up: ['up-end', 'vertical'],
            right: ['right-end', 'horizontal'],
            down: ['down-end', 'vertical'],
            left: ['left-end', 'horizontal'],
          }[direction] as [ExplosionTypes, ExplosionTypes];
          for (let i = 1; i <= radius; i++) {
            const point: Vector = [pos[0] + dir[0] * i, pos[1] + dir[1] * i];

            // Checks if current tile is out of bounds
            if (
              point[0] <= 0 ||
              point[1] <= 0 ||
              point[0] > session.getSize()[0] ||
              point[1] > session.getSize()[1]
            )
              break;

            // Checks if the current tile has an object that blocks the explosion
            let interruptLine: boolean = false;
            if (!nitro) {
              for (const obj of session.checkTile(point)) {
                if (BlocksExplosion.blocksExplosion(obj)) {
                  interruptLine = true;
                  break;
                }
              }
            } else {
              for (const obj of session.checkTile(point)) {
                if (BlocksNitro.blocksNitro(obj)) {
                  interruptLine = true;
                  break;
                }
              }
            }

            // Spawns the explosion
            const explosion = new Explosion(
              i === radius || interruptLine ? type[0] : type[1]
            );
            explosion.pos = point;
            session.addObject(explosion);
            if (interruptLine) break;
          }
        }
      })
    );
  }

  protected onEnterTree() {
    this.explodeTimeout = setTimeout(() => Explodable.explode(this), 5000);
  }

  protected onExitTree() {
    if (this.explodeTimeout) clearTimeout(this.explodeTimeout);
  }

  public parse() {
    return {
      type: 'bomb',
      position: this.pos,
      extras: [],
    };
  }
}
