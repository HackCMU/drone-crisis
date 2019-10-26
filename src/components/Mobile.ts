import {Game} from '../Game';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Component} from './Component';
import {Depth} from './Depth';

export abstract class Mobile extends Component {
    protected constructor(
        depth: Depth,
        frame: Rect2D,
        public vel: Vector2D,
        public maxSpeed: number,
        public acc: Vector2D,
    ) {
        super(depth, frame);
    }

    public update(deltaMs: number, game: Game): void {
        this.vel.add(this.acc.multiplying(deltaMs / 1000));
        const maxSpeedMag = this.maxSpeed * deltaMs / 1000;
        this.vel.limit(maxSpeedMag);
        this.frame.translate(this.vel);
    }
}
