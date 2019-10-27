import {Game} from '../Game';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Depth} from './Depth';

export abstract class Component {
    public constructor(public readonly depth: Depth, public frame: Rect2D) {
    }

    public abstract update(deltaMs: number, game: Game): void;

    public abstract render(ctx: CanvasRenderingContext2D, game: Game): void;

    /** Called when the component is being selected */
    public didSelect() { }
}
