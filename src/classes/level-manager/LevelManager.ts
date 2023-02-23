import { Level } from '@/classes';
import { levels } from '@/levels';
import { ParsedTile } from '@/types';

export class LevelManager {
  private static instance: LevelManager | undefined;
  private levels: Level[] = [];

  private constructor() {
    for (const level of levels) {
      this.levels.push(new Level(level.name, level.tilemap));
    }
  }

  private static getInstance() {
    if (!LevelManager.instance) {
      LevelManager.instance = new LevelManager();
    }
    return LevelManager.instance;
  }

  public static getLevels() {
    return LevelManager.getInstance().levels as readonly Level[];
  }

  public static findLevel(name: string) {
    const arr = LevelManager.getLevels();
    for (const level of arr) {
      if (level.name === name) return level;
    }
    return null;
  }
}