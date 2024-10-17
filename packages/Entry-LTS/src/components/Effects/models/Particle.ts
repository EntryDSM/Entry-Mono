// models/Particle.ts
import { Vector } from './Vector';

export class Particle {
  pos: Vector;
  color: string;
  vel: Vector;
  acc: Vector;
  size: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isRoot: boolean = true,
    color: string,
    size: number = 4,
  ) {
    this.pos = new Vector(x, y);
    this.color = color;
    if (isRoot) {
      this.vel = new Vector(0, -(Math.random() * 4) - 8);
    } else {
      this.vel = Vector.random(
        0.5,
        Math.random() * 20 + 4,
        0,
        -Math.random() * 10 - 3,
      );
      this.vel.mult({
        x: 0.3,
        y: 0.5,
      });
    }
    this.acc = new Vector(0, 0);
    this.size = size;
    this.ctx = ctx;
  }

  addForce(force: Vector): void {
    this.acc.add(force);
  }

  update(lifespan?: number): void {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    if (lifespan) {
      this.size = lifespan;
    }
  }

  render(): void {
    this.ctx.lineWidth = this.size;
    if (this.size < 0) {
      return;
    }
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos.x,
      this.pos.y,
      this.ctx.lineWidth / 2,
      0,
      Math.PI * 2,
      false,
    );
    this.ctx.fill();
    this.ctx.closePath();
  }
}
