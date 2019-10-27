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

    public set x(val: number) {
        this.origin.x = val;
    }

    public get y(): number {
        return this.origin.y;
    }

    public set y(val: number) {
        this.origin.y = val;
    }

    public get width(): number {
        return this.size.x;
    }

    public set width(val: number) {
        this.size.width = val;
    }

    public get height(): number {
        return this.size.y;
    }

    public set height(val: number) {
        this.size.height = val;
    }

    public get center(): Vector2D {
        return this.origin.adding(this.size.multiplying(0.5));
    }

    public contains(vector: Vector2D): boolean {
        return this.x < vector.x && (this.x + this.width) > vector.x
            && this.y < vector.y && (this.y + this.height) > vector.y;
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

    public centerRect(size: Vector2D): Rect2D {
        return new Rect2D(
            this.x - size.x / 2,
            this.y - size.y / 2,
            size.width,
            size.height,
        );
    }
}
