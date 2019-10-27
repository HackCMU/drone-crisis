export class Vector2D {
    public constructor(
        public x: number,
        public y: number,
    ) {
    }

    /**
     * Instantiates a new unit vector from the given radians.
     */
    public static fromAngle(radians: number): Vector2D {
        return new Vector2D(Math.cos(radians), Math.sin(radians));
    }

    /**
     * @returns a new random unit vector
     */
    public static get random(): Vector2D {
        return new Vector2D(Math.random() - 0.5, Math.random() - 0.5);
    }

    public add(another: Vector2D) {
        this.x += another.x;
        this.y += another.y;
    }

    public sub(another: Vector2D) {
        this.x -= another.x;
        this.y -= another.y;
    }

    public subtracting(another: Vector2D) {
        return new Vector2D(this.x - another.x, this.y - another.y);
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

    public get heading(): number {
        return Math.atan2(this.y, this.x);
    }

    public rotate(radians: number) {
        return Vector2D.fromAngle(radians + this.heading).multiplying(this.mag);
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
