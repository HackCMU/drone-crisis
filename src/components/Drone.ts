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
     * @param speed speed is in pixels per second.
     * @param frame rectangle containing the drone.
     */
    public constructor(public speed: number, frame: Rect2D) {
        super(Depth.FRONT, frame);
    }

    public update(deltaMs: number, game: Game): void {
        const mag = this.speed * deltaMs / 1000;
        const vel = this.heading(game).multiplying(mag);
        console.info(vel);
        this.frame.translate(vel);
    }

    /**
     * Calculates the heading of the drone based on keyboard inputs
     * @return a unit vector representing the heading of the drone.
     */
    public heading(game: Game): Vector2D {
        const h = new Vector2D(0, 0);
        if (game.keyboard.isKeyPressed(Key.W)) {
            h.add(Vector2D.unitVectors.up);
        }
        if (game.keyboard.isKeyPressed(Key.S)) {
            h.add(Vector2D.unitVectors.down);
        }
        if (game.keyboard.isKeyPressed(Key.A)) {
            h.add(Vector2D.unitVectors.left);
        }
        if (game.keyboard.isKeyPressed(Key.D)) {
            h.add(Vector2D.unitVectors.right);
        }
        return h.normalized();
    }

    public render(ctx: CanvasRenderingContext2D, game: Game): void {
        ctx.fillStyle = `rgb(255, ${Math.random() * 255}, 128)`;
        ctx.fillRect(0, 0, this.frame.size.x, this.frame.size.y);
    }
}
