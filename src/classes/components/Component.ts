import { GameObject } from '@/classes';

export abstract class Component {
  public readonly gameObject: GameObject;

  private _initialized: boolean;

  public get initialized() {
    return this._initialized;
  }

  private constructor(obj: GameObject) {
    this.gameObject = obj;
    this._initialized = false;
  }

  public abstract create(obj: GameObject): void;

  public removeSelf() {
    this.gameObject.removeComponent(this);
  }
}