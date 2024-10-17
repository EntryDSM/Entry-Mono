// models/Vector.ts
export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(dv: Vector): void {
    this.x += dv.x;
    this.y += dv.y;
  }

  mult(val: number | { x: number; y: number } = 1): void {
    if (typeof val === 'object') {
      const { x, y } = val;
      this.x *= x;
      this.y *= y;
    } else {
      this.x *= val;
      this.y *= val;
    }
  }

  objectify(): { x: number; y: number } {
    return {
      x: this.x,
      y: this.y,
    };
  }

  static multiply(baseVector: Vector, val: number): Vector {
    return new Vector(baseVector.x * val, baseVector.y * val);
  }

  static random(
    bandWidthX: number = 0.5,
    strengthX: number = 1,
    bandWidthY: number = 0.5,
    strengthY: number = 1,
  ): Vector {
    const x = (Math.random() - bandWidthX) * strengthX;
    const y = (Math.random() - bandWidthY) * strengthY;
    return new Vector(x, y);
  }
}
