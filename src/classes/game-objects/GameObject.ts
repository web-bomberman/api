import { Component, GameSession } from '@/classes';
import { ParsedGameObject, Vector } from '@/types';

export abstract class GameObject {
  public pos: Vector;

  private session: GameSession | null = null;
  private components: Component[] = [];

  constructor() {
    this.pos = [0, 0];
  }

  public getSession() {
    return this.session;
  }

  public getComponents() {
    return this.components as readonly Component[];
  }

  public setSession(session: GameSession | null) {
    if (this.session === session) return;
    if (!session) {
      this.removeSelf();
      return
    }
    this.session = session;
    if (session) {
      session.addObject(this);
      this.onEnterSession(session);
    };
  }

  public removeSelf() {
    if (this.session) {
      const session = this.session;
      this.session = null;
      session.removeObject(this);
      this.onLeaveSession(session);
    }
  }

  protected abstract onEnterSession(session: GameSession): void;

  protected abstract onLeaveSession(session: GameSession): void;

  public addComponent(comp: Component) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] === comp) return;
    }
    this.components.push(comp);
    comp.setGameObject(this);
  }

  public removeComponent(comp: Component) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] === comp) {
        this.components.splice(i, 1);
        comp.removeSelf();
        break;
      }
    }
  }

  public findComponent(type: string) {
    for (const comp of this.components) {
      if (comp.constructor.name === type) return comp;
    }
    return null;
  }

  public abstract parse(): ParsedGameObject;
}