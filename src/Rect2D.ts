import {Vector2D} from './Vector2D';

export class Rect2D {
    public origin: Vector2D;
    public size: Vector2D;

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
        return this.origin.adding(this.size.multiplying(0.5));
    }

    public translate(x: number | Vector2D, y?: number) {
        if (x instanceof Vector2D) {
            this.origin.add(x);
        } else if (y !== undefined) {
            this.origin.add(new Vector2D(x, y));
        } else {
            this.origin.add(new Vector2D(x, x));
        }
    }
}
