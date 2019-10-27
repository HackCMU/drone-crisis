import {Game} from '../Game';
import {getImage} from '../Image';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Bullet} from './Bullet';
import {Depth} from './Depth';
import {Fragment} from './Fragment';
import {Mobile} from './Mobile';

export class Person extends Mobile {
    private static readonly dir = 'person/walk_';
    // Constant for matching velocity and frame rate.
    private static readonly k = 30;
    private static readonly numFrames = 12;
    // Start at different frame to prevent mob effect.
    private currIdx: number = Math.floor(Math.random() * Person.numFrames);
    private isAlive = true;

    public constructor(depth: Depth, frame: Rect2D, public speed: number) {
        super(depth, frame, Vector2D.zero, 200, Vector2D.zero);
        this.vel = Person.randomDir.multiplying(speed);
    }

    public update(deltaMs: number, game: Game): void {
        if (!this.isAlive) {
            game.removeComponent(this);
            Fragment.createExplosion(game, this.frame.center, 20, this.frame.width / 20);
        }
        if (Person.chance(0.01)) {
            this.vel = Person.randomDir.multiplying(this.speed);
        }
        super.update(deltaMs, game);
    }

    public render(ctx: CanvasRenderingContext2D, game: Game): void {
        const image = getImage(Person.dir + Math.floor(this.currIdx) % Person.numFrames);
        ctx.save();
        if (this.vel.x > 0) {
            ctx.translate(this.frame.width, 0);
            ctx.transform(-1, 0, 0, 1, 0, 0);
        }
        ctx.drawImage(image, 0, 0, this.frame.size.x, this.frame.size.y);
        ctx.restore();
        this.currIdx += Person.k / this.speed;
    }

    public die() {
        this.isAlive = false;
    }

    private static chance(prob: number): boolean {
        return Math.random() < prob;
    }

    private static get randomDir(): Vector2D {
        return Math.floor(Math.random() * 2) === 0 ? Vector2D.unitVectors.left : Vector2D.unitVectors.right;
    }
}
