import { GameObject } from '@/classes';

export abstract class Component {
  private gameObject: GameObject | null = null;

  constructor() {}

  public getGameObject() {
    return this.gameObject;
  }

  public setGameObject(obj: GameObject | null) {
    if (this.gameObject === obj) return;
    if (!obj) {
      this.removeSelf();
      return
    }
    this.gameObject = obj;
    if (obj) obj.addComponent(this);
  }

  public removeSelf() {
    if (this.gameObject) {
      const obj = this.gameObject;
      this.gameObject = null;
      obj.removeComponent(this);
    }
  }
}