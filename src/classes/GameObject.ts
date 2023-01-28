import { Component } from "@/classes";

export type Vector = [number, number];

export abstract class GameObject {
  public pos: Vector;
  readonly components: Component[];

  constructor(pos: Vector) {
    this.pos = pos;
    this.components = [];
  }
}