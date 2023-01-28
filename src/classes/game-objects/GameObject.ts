import { Component, GameSession } from '@/classes';

export type Vector = [number, number];

export abstract class GameObject {
  public readonly session: GameSession;
  public pos: Vector;

  private _initialized: boolean;
  private _components: Component[];

  public get initialized() {
    return this._initialized;
  }
  
  public get components() {
    return this._components as readonly Component[];
  }

  protected constructor(session: GameSession) {
    this.pos = [0, 0];
    this.session = session;
    this._components = [];
    this._initialized = false;
  }

  public initialize() {
    if (this._initialized) {
      throw new Error("Object already initialized.");
    }
    this._initialized = true;
  }

  public addComponent(comp: Component) {
    if (comp.initialized) {
      throw new Error("Can't call addComponent() outside create() methods.");
    }
    this._components.push(comp);
  }

  public findComponent(name: string) {
    for (const comp of this._components) {
      if (comp.constructor.name === name) return comp;
    }
    return null;
  }

  public removeComponent(comp: Component) {
    for (let i = 0; i < this._components.length; i++) {
      if (Object.is(this._components[i], comp)) {
        this._components.splice(i, 1);
        break;
      }
    }
  }

  public removeSelf() {
    if (this.session) {
      this.session.removeObject(this);
    }
  }
}