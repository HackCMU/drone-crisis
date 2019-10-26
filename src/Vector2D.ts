export class Vector2D {
    public constructor(
        public x: number,
        public y: number,
    ) {
    }

    public add(another: Vector2D) {
        this.x += another.x;
        this.y += another.y;
    }

    public adding(another: Vector2D): Vector2D {
        return new Vector2D(this.x + another.x, this.y + another.y);
    }

    public multiply(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    public multiplying(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    public normalized(): Vector2D {
        let m = this.mag;
        m = m === 0 ? 1 : m; // Prevent division by zero.
        return new Vector2D(this.x / m, this.y / m);
    }

    public limit(magnitude: number) {
        if (this.mag > magnitude) {
            this.setMag(magnitude);
        }
    }

    public setMag(m: number) {
        this.multiply(m / this.mag);
    }

    public copy(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    public get mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public static get zero(): Vector2D {
        return new Vector2D(0, 0);
    }

    public static get unitVectors() {
        return {
            up: new Vector2D(0, -1),
            down: new Vector2D(0, 1),
            left: new Vector2D(-1, 0),
            right: new Vector2D(1, 0),
        };
    }
}
