// This folder is meant to contain the base classes for game objects,
// components and game sessions in the composite pattern. We're doing this
// to avoid problems with circular loading of modules.

import {
  ParsedGameObject,
  ParsedGameSession,
  PlayerState,
  SessionState,
  Vector
} from '@/types';

export abstract class Node {
  protected parent: Node | null = null;
  protected children: Node[] = [];

  constructor() {}

  protected abstract onEnterTree(): void;

  protected abstract onExitTree(): void;

  protected addChild(child: Node) {
    this.children.push(child);
    child.parent = this;
    child.onEnterTree();
  }

  protected removeChild(child: Node) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        child.parent = null;
        child.onExitTree();
        break;
      }
    }
  }

  public removeSelf() {
    if (this.parent) this.parent.removeChild(this);
  }
}

export abstract class Component extends Node {
  constructor() {
    super();
  }

  public getGameObject() {
    return this.parent as GameObject | null;
  }
}

export abstract class GameObject extends Node {
  public id: number | null;
  public pos: Vector;
  
  constructor() {
    super();
    this.id = null;
    this.pos = [0, 0];
  }

  public getSession() {
    return this.parent as GameSession;
  }

  public getComponents() {
    return [...this.children] as Component[];
  }

  public addComponent(comp: Component) {
    this.addChild(comp);
  }

  public removeComponent(comp: Component) {
    this.removeChild(comp);
  }

  public findComponent(type: string) {
    for (const comp of this.children) {
      if (comp.constructor.name === type) return comp as Component;
    }
    return null;
  }

  public abstract parse(): ParsedGameObject;
}

export class GameSession extends Node {
  public readonly id: string;

  public state: SessionState;
  public player1: PlayerState;
  public player2: PlayerState;
  
  private player1Obj: GameObject | null = null;
  private player2Obj: GameObject | null = null;
  private size: Vector = [0, 0];
  private objectIdCount: number = 0;
  // private durationSeconds: number = 0;
  private secondsP1LastPing: number = 0;
  private secondsP2LastPing: number = 0;
  private timeCheckInterval: NodeJS.Timer | null = null;

  constructor(id: string) {
    super();
    this.id = id;
    this.state = 'room';
    this.player1 = 'waiting';
    this.player2 = 'waiting';
    this.timeCheckInterval = setInterval(() => {
      // this.durationSeconds++;
      if (this.player1 !== 'waiting') this.secondsP1LastPing++;
      if (this.player2 !== 'waiting') this.secondsP2LastPing++;
      if (
        this.secondsP1LastPing >= 5 &&
        this.player1 !== 'waiting' &&
        this.player1 !== 'disconnected'
      ) this.player1 = 'reconnecting';
      if (
        this.secondsP2LastPing >= 5 &&
        this.player2 !== 'waiting' &&
        this.player2 !== 'disconnected'
      ) this.player2 = 'reconnecting';
      if (
        this.secondsP1LastPing >= 15 &&
        this.player1 === 'reconnecting'
      ) this.player1 = 'disconnected';
      if (
        this.secondsP2LastPing >= 15 &&
        this.player2 === 'reconnecting'
      ) this.player2 = 'disconnected';
      if (
        this.state === 'room' &&
        this.player1 !== 'disconnected' &&
        this.player2 === 'disconnected'
      ) {
        this.player2 = 'waiting';
        this.secondsP2LastPing = 0;
      }
      if (
        this.state === 'room' &&
        this.player1 === 'disconnected' &&
        this.player2 !== 'disconnected'
      ) {
        this.player1 = 'waiting';
        this.secondsP1LastPing = 0;
      }
      if (
        this.player1 === 'disconnected' &&
        this.player2 === 'disconnected'
      ) this.stopGame();
    }, 1000);
  }

  protected onEnterTree() {}

  protected onExitTree() {}

  public getGameObjects() {
    return [...this.children] as GameObject[];
  }

  public getSize() {
    return [...this.size] as Vector;
  }

  public addObject(obj: GameObject) {
    this.addChild(obj);
    obj.id = this.objectIdCount;
    this.objectIdCount++;
  }

  public removeObject(obj: GameObject) {
    obj.removeSelf();
    obj.id = null;
  }

  public parse() {
    const parsed: ParsedGameSession = {
      id: this.id,
      state: this.state,
      player1: this.player1,
      player2: this.player2,
      size: this.size,
      gameObjects: []
    };
    const gameObjects = this.getGameObjects();
    for (let i = 0; i < gameObjects.length; i++) {
      parsed.gameObjects.push({ ...gameObjects[i].parse() });
    }
    return parsed;
  }

  public playerPinged(player: 1 | 2) {
    if (player === 1) {
      this.secondsP1LastPing = 0;
      if (this.player1 === 'reconnecting') {
        if (this.state === 'room') this.player1 = 'not ready';
        if (this.state === 'running') this.player1 = 'connected';
      }
    } else if (player === 2) {
      this.secondsP2LastPing = 0;
      if (this.player2 === 'reconnecting') {
        if (this.state === 'room') this.player2 = 'not ready';
        if (this.state === 'running') this.player2 = 'connected';
      }
    }
  }

  public startGame(
    objects: GameObject[],
    player1: GameObject,
    player2: GameObject,
    size: Vector
  ) {
    this.state = 'starting';
    this.player1 = 'connected';
    this.player2 = 'connected';
    this.player1Obj = player1;
    this.player2Obj = player2;
    this.size = size;
    for (const obj of objects) {
      this.addObject(obj);
    }
    setTimeout(() => {
      this.state = 'running';
    }, 3000);
  }

  public stopGame(player?: 1 | 2) {
    if (player) this.state = `player${player} won`;
    else this.state = 'interrupted';
    if (this.timeCheckInterval) clearInterval(this.timeCheckInterval);
    setTimeout(() => this.removeSelf(), 5000)
  }

  public checkTile(pos: Vector) {
    return this.getGameObjects().filter(
      (obj) => (obj.pos[0] === pos[0] && obj.pos[1] === pos[1])
    );
  }

  public getPlayer(player: 1 | 2) {
    if (player === 1) return this.player1Obj;
    else return this.player2Obj;
  }
}