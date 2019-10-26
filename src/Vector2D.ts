export class Vector2D {
  public constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
  public add(another: Vector2D) {
    return new Vector2D(this.x + another.x, this.y + another.y);
  }
  public multiply(byScalar: number) {
    return new Vector2D(this.x * byScalar, this.y * byScalar);
  }
  public static get zero(): Vector2D {
    return new Vector2D(0, 0);
  }
}
