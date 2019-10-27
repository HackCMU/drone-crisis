import {Game} from '../Game';
import {getImage} from '../Image';
import {Key} from '../Keyboard';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Bullet} from './Bullet';
import {Component} from './Component';
import {Depth} from './Depth';
import {Mobile} from './Mobile';
import {Person} from './Person';
import {Text} from './Text';

export class Drone extends Mobile {
    private bulletsToFire: Array<Bullet> = [];

    /**
     * Instantiates a new drone object.
     * @param maxSpeed max speed of the drone in `pixels/sec`.
     * @param accMag magnitude of acceleration in `pixels/sec^2`
     * @param vel initial velocity of the drone, a `Vector2D` with magnitude in `pixels/sec`
     * @param frame rectangle containing the drone.
     */
    public constructor(
        frame: Rect2D,
        public maxSpeed: number = 1000,
        public vel: Vector2D = Vector2D.zero,
        public accMag: number = 50,
    ) {
        super(Depth.FRONT, frame, vel, maxSpeed, Vector2D.zero);
        window.addEventListener('mousedown', event => {
            const mouseVec = new Vector2D(event.clientX, event.clientY);
            const dir = mouseVec.subtracting(this.frame.origin);
            this.fire(dir);
        });
    }

    private lastHeadingRight: boolean = true;

    public update(deltaMs: number, game: Game): void {
        if (this.isAccelerating(game)) {
            // Accelerate
            this.acc = this.heading(game).multiplying(this.accMag);
            this.lastHeadingRight = this.acc.x >= 0;
        } else {
            // Brake
            this.acc = this.vel.normalized()
                .multiplying(-1 * this.accMag);
        }
        super.update(deltaMs, game);
        this.updateCamera(game);
        for (const bullet of this.bulletsToFire) {
            game.scene!.components.add(bullet);
        }
    }

    private a: number = 1;

    private updateCamera(game: Game) {
        const height = Math.max((game.scene!.dimensions.y - this.frame.center.y) * 1.4, 600);
        const scale = height / window.innerHeight;
        const width = scale * window.innerWidth;
        const x = this.lastHeadingRight
            ? this.frame.center.x - width * 0.3
            : this.frame.center.x - width * 0.7;
        game.moveCamera(new Vector2D(x + width / 2, game.scene!.dimensions.y - height / 2), 1 / scale);
        // if (game.keyboard.isKeyPressed(Key.Q)) {
        //     this.a -= 0.1;
        // }
        // if (game.keyboard.isKeyPressed(Key.E)) {
        //     this.a += 0.1;
        // }
        // game.setCamera(this.frame.center, this.a);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        const img = getImage('drone_body');
        ctx.drawImage(img, 0, 0, this.frame.width, this.frame.height);
    }

    public fire(dir: Vector2D) {
        const frame = new Rect2D(this.frame.center.copy(), new Vector2D(20, 3));
        const bullet = new Bullet(dir.normalized().multiplying(1000), frame);
        this.bulletsToFire.push(bullet);
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
}
