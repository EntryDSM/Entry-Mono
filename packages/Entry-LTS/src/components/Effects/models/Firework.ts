// models/Firework.ts
import { Particle } from './Particle';
import { Vector } from './Vector';
import { FireWorkHeap } from './FireWorkHeap';

const colorPalette = [
  '#7033FE',
  '#02b7fd',
  '#e80b0d',
  '#ffa30c',
  '#feff0c',
  '#0FFAA1',
  '#F4F4F4',
  '#F48FF2',
  '#FF0000',
  '#0000FF',
  '#FFFF00',
  '#00FF00',
];

export class Firework {
  ctx: CanvasRenderingContext2D;
  field: { width: number; height: number };
  particles: Particle[];
  explode: boolean;
  finish: boolean;
  lifespan: number;
  store: FireWorkHeap;
  baseDeaccelerator: Vector;
  root?: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    storage: FireWorkHeap,
    field: { width: number; height: number },
    baseDeaccelerator: Vector,
  ) {
    this.ctx = ctx;
    this.field = field;
    this.particles = [];
    this.explode = false;
    this.finish = false;
    this.lifespan = 4;
    this.store = storage;
    this.baseDeaccelerator = baseDeaccelerator;
    this.blast();
  }

  update(): void {
    if (this.finish) {
      return;
    }
    if (this.explode) {
      this.lifespan -= 0.03;

      for (let i = 0; i < this.particles.length; i++) {
        const force = Vector.multiply(this.baseDeaccelerator, 0.3);
        this.particles[i].addForce(force);
        this.particles[i].update(this.lifespan);
      }
      if (this.lifespan <= 0) {
        this.finish = true;
        this.store.onStageRemoval();
        return;
      }
    }
  }

  blast(): void {
    const randomX = Math.random() * this.field.width;
    const randomY = Math.random() * this.field.height;

    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 2;

      const randomColor =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];

      const particle = new Particle(
        this.ctx,
        randomX,
        randomY,
        false,
        randomColor,
        Math.random() * 5 + 2,
      );

      particle.vel.x = Math.cos(angle) * speed;
      particle.vel.y = Math.sin(angle) * speed;
      this.particles.push(particle);
    }

    this.explode = true;
  }

  render(): void {
    if (this.explode) {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].render();
      }
    }
  }
}
