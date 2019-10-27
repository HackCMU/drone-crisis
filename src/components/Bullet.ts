import {Game} from '../Game';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Component} from './Component';
import {Depth} from './Depth';
import {Mobile} from './Mobile';

export class Bullet extends Mobile {
    public hasExpired = false;

    /**
     * Instantiates a new bullet object.
     * @param vel: velocity of the bullet having magnitude of pixels/sec
     * @param frame
     */
    public constructor(
        public vel: Vector2D,
        frame: Rect2D,
    ) {
        super(Depth.FRONT, frame, vel, vel.mag, Vector2D.zero);
    }

    public update(deltaMs: number, game: Game): void {
        if (this.hasExpired) {
            game.removeComponent(this);
        }
        super.update(deltaMs, game);
    }

    public render(ctx: CanvasRenderingContext2D, game: Game): void {
        ctx.fillStyle = `rgb(255, 0, 0)`;
        ctx.save();
        ctx.rotate(this.vel.heading);
        ctx.fillRect(0, 0, this.frame.size.x, this.frame.size.y);
        ctx.restore();
    }
}
