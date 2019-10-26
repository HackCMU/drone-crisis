import {Game} from '../Game';
import {getImage} from '../Image';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Depth} from './Depth';
import {Mobile} from './Mobile';

export class Person extends Mobile {
    private static dir = 'images/1x/person/';
    private static images = new Array(12)
        .fill(1).map((_, index) => Person.dir + index)
        .map(dir => getImage(dir));

    public constructor(depth: Depth, frame: Rect2D, public speed: number) {
        super(depth, frame, Vector2D.zero, 200, Vector2D.zero);
        this.vel = Person.randomDir.multiplying(speed);
    }

    public update(deltaMs: number, game: Game): void {
        if (Person.chance(0.01)) {
            this.vel = Person.randomDir.multiplying(this.speed);
        }
        super.update(deltaMs, game);
    }

    public render(ctx: CanvasRenderingContext2D, game: Game): void {
        // i
    }

    private static chance(prob: number): boolean {
        return Math.random() < prob;
    }

    private static get randomDir(): Vector2D {
        return Math.floor(Math.random() * 2) === 0 ? Vector2D.unitVectors.left : Vector2D.unitVectors.right;
    }
}
