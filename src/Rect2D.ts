import { Vector2D } from './Vector2D';

export class Rect2D {
    public readonly origin: Vector2D;
    public readonly size: Vector2D;

    public constructor(origin: Vector2D, size: Vector2D)
    public constructor(x: number, y: number, width: number, height: number)
    public constructor(
        xOrOrigin: number | Vector2D,
        yOrSize: number | Vector2D,
        width?: number,
        height?: number) {
        if (xOrOrigin instanceof Vector2D && yOrSize instanceof Vector2D) {
            this.origin = xOrOrigin;
            this.size = yOrSize;
        } else if (typeof xOrOrigin === 'number' && typeof yOrSize === 'number'
                && typeof width === 'number' && typeof height === 'number') {
            this.origin = new Vector2D(xOrOrigin, yOrSize);
            this.size = new Vector2D(width, height);
        } else {
            throw new Error('Invalid arguments for constructing a Rect2D');
        }
    }
    public get x(): number {
        return this.origin.x;
    }
    public get y(): number {
        return this.origin.y;
    }
    public get width(): number {
        return this.size.x;
    }
    public get height(): number {
        return this.size.y;
    }
    public get center(): Vector2D {
        return this.origin.add(this.size.multiply(0.5));
    }
    public translate(byVector: Vector2D): Rect2D {
        return new Rect2D(
            this.origin.add(byVector),
            this.size,
        );
    }
}
