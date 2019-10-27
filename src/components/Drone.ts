import {Game} from '../Game';
import {getImage} from '../Image';
import {Key} from '../Keyboard';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Bullet} from './Bullet';
import {Component} from './Component';
import {Depth} from './Depth';
import {Fragment} from './Fragment';
import {Mobile} from './Mobile';
import {Obstacle} from './Obstacle';
import {Person} from './Person';
import {Text} from './Text';

export class Drone extends Mobile {
    private reloadDurationMs = 100;
    private lastFired = Date.now();

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
    }

    public update(deltaMs: number, game: Game): void {
        // for (const obs of game.scene!.components) {
        //     if (obs instanceof Obstacle && obs.depth === this.depth) {
        //         const points = [
        //             this.frame.origin,
        //             this.frame.origin.adding(this.frame.size),
        //             this.frame.origin.adding(new Vector2D(this.frame.width, 0)),
        //             this.frame.origin.adding(new Vector2D(0, this.frame.height)),
        //         ];
        //         for (const co of points) {
        //             if (obs.frame.contains(co)) {
        //                 Fragment.createExplosion(game, this.frame.center, 100, this.frame.width / 5);
        //                 game.scene!.removeComponent(this);
        //             }
        //         }
        //     }
        // }
        if (this.isAccelerating(game)) {
            // Accelerate
            this.acc = this.heading(game).multiplying(this.accMag);
        } else {
            // Brake
            this.acc = this.vel.normalized()
                .multiplying(-1 * this.accMag);
        }
        super.update(deltaMs, game);
        this.updateCamera(game);
        if (game.keyboard.isKeyPressed(Key.SPACE)) {
            if (Date.now() - this.lastFired > this.reloadDurationMs) {
                this.fire(game);
                this.lastFired = Date.now();
            }
        }
    }

    private a: number = 1;

    private updateCamera(game: Game) {
        const height = Math.max((game.scene!.dimensions.y - this.frame.center.y) * 1.4, 600);
        const scale = height / window.innerHeight;
        game.moveCamera(new Vector2D(this.frame.x, game.scene!.dimensions.y - height / 2), 1 / scale);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        const img = getImage('drone_body');
        ctx.drawImage(img, 0, 0, this.frame.width, this.frame.height);
    }

    public fire(game: Game) {
        const frame = new Rect2D(this.frame.center.copy(), new Vector2D(20, 3));
        let dir = this.vel.normalized();
        if (this.vel.mag < 5) {
            dir = Vector2D.unitVectors.right;
        }
        dir.multiply(2000);
        const bullet = new Bullet(this.vel.adding(dir), frame);
        game.scene!.addComponent(bullet);
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
