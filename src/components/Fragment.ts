import {Game} from '../Game';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Depth} from './Depth';
import {Mobile} from './Mobile';

export class Fragment extends Mobile {
    private theta = Math.random();
    private birthdate = Date.now();

    /**
     *
     * @param depth canvas depth
     * @param frame frame of the fragment
     * @param vel velocity of the fragment in pixels/sec
     * @param acc acceleration of the fragment in pixels/sec^2
     * @param updator updates velocity and acceleration
     * @param lifeSpan life span in milliseconds
     * @param destroyCondition condition to destroy the debri
     * @param color color of the fragment without alpha
     * @param rotConstant rotation constant
     */
    public constructor(
        depth: Depth,
        frame: Rect2D,
        vel: Vector2D,
        acc: Vector2D,
        public updator: (vel: Vector2D, acc: Vector2D) => void,
        public destroyCondition?: (frag: Fragment) => boolean,
        public lifeSpan: number = 1000,
        public color: string = 'red',
        public rotConstant: number = 0.01,
    ) {
        super(depth, frame, vel, 200, acc);
    }

    public update(deltaMs: number, game: Game): void {
        if (this.livedDuration > this.lifeSpan
            || this.destroyCondition !== undefined && this.destroyCondition(this)) {
            game.removeComponent(this);
        }
        super.update(deltaMs, game);
        this.theta += this.rotConstant;
    }

    private get livedDuration(): number {
        return Date.now() - this.birthdate;
    }

    public render(ctx: CanvasRenderingContext2D, game: Game): void {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.rotate(this.theta);
        ctx.globalAlpha = 1 - this.livedDuration / this.lifeSpan;
        ctx.beginPath();
        ctx.moveTo(this.frame.width / 2, 0);
        ctx.lineTo(0, this.frame.height);
        ctx.lineTo(this.frame.width, this.frame.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    /**
     * @param game the game object
     * @param num number of fragments
     * @param pos position of the explosion
     * @param size size of the
     */
    public static createExplosion(game: Game, pos: Vector2D, num: number, size: number) {
        for (let i = 0; i < num; i++) {
            const rSize = this.randNorm() * size;
            const frame = new Rect2D(pos.copy(), new Vector2D(rSize, rSize));
            const dir = Vector2D.random.multiplying(200);
            const fragment = new Fragment(
                Depth.FRONT,
                frame,
                dir,
                dir.multiplying(-0.1),
                (vel, acc) => {
                    acc.limit(vel.mag);
                },
                (frag) => {
                    return frag.vel.mag <= 0.5;
                },
            );
            game.addComponent(fragment);
        }
    }

    private static randNorm() {
        let u = 0;
        let v = 0;
        while (u === 0) {
            u = Math.random();
        }
        while (v === 0) {
            v = Math.random();
        }
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }
}
