import {Game} from '../Game';
import {getImage} from '../Image';
import {Key} from '../Keyboard';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Component} from './Component';
import {Depth} from './Depth';

export class Drone extends Component {
    /**
     * Instantiates a new drone object.
     * @param maxSpeed max speed of the drone in `pixels/sec`.
     * @param acc acceleration in `pixels/sec^2`
     * @param vel initial velocity of the drone, a `Vector2D` with magnitude in `pixels/sec`
     * @param frame rectangle containing the drone.
     */
    public constructor(
        frame: Rect2D,
        public maxSpeed: number = 30,
        public vel: Vector2D = Vector2D.zero,
        public acc: number = 50,
    ) {
        super(Depth.FRONT, frame);
    }

    public update(deltaMs: number, game: Game): void {
        const mag = this.acc * deltaMs / 1000;
        if (this.isAccelerating(game)) {
            const accVec = this.heading(game).multiplying(mag);
            this.vel.add(accVec);
        } else {
            const brakeDir = this.vel.normalized()
                .multiplying(-1 * mag);
            brakeDir.limit(this.vel.mag);
            this.vel.add(brakeDir);
        }
        this.vel.limit(this.maxSpeed);
        this.frame.translate(this.vel);
    }

    /**
     * The drone is constantly in one of the two states - accelerating or braking.
     * @returns true if the drone is accelerating, i.e. one of W, A, S, or D is pressed.
     */
    public isAccelerating(game: Game): boolean {
        return game.keyboard.isKeysPressed([Key.W, Key.A, Key.S, Key.D]);
    }

    private static get accVecs(): Array<{ key: Key, dir: Vector2D }> {
        return [
            {key: Key.W, dir: Vector2D.unitVectors.up},
            {key: Key.S, dir: Vector2D.unitVectors.down},
            {key: Key.A, dir: Vector2D.unitVectors.left},
            {key: Key.D, dir: Vector2D.unitVectors.right},
        ];
    }

    /**
     * Calculates the heading of the drone based on keyboard inputs
     * @return a unit vector representing the heading of the drone.
     */
    public heading(game: Game): Vector2D {
        const h = new Vector2D(0, 0);
        for (const o of Drone.accVecs) {
            if (game.keyboard.isKeyPressed(o.key)) {
                h.add(o.dir);
            }
        }
        return h.normalized();
    }

    public render(ctx: CanvasRenderingContext2D, game: Game): void {
        ctx.fillStyle = `rgb(0, 0, 0)`;
        ctx.fillRect(0, 0, this.frame.size.x, this.frame.size.y);
    }
}
