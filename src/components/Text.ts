import { Component } from './Component';
import { Vector2D } from '../Vector2D';
import { Depth } from './Depth';
import { Rect2D } from '../Rect2D';
import { Game } from '../Game';

export class Text extends Component {
    public fontSize: number = 15;
    public fontFamily: string = "sans-serif";
    public style: string = "black";

    /**
     * Where to anchor the text
     * (0, 0) -------- (1, 0)
     * |      (.5, .5)      |
     * (0, 1) -------- (1, 1)
     */
    public anchor: Vector2D = new Vector2D(0.5, 0.5);

    constructor(
        depth: Depth,
        origin: Vector2D,
        public content: string,
    ) {
        super(depth, new Rect2D(origin, new Vector2D(0, 0)));
    }

    public update(deltaMs: number, game: Game): void { }

    public render(ctx: CanvasRenderingContext2D) {
        const canvasTextSize = ctx.measureText(this.content);
        const textSize = new Vector2D(canvasTextSize.width, this.fontSize);
        const translatedTextPosition = this.frame.origin.adding(
            this.anchor
                .adding(new Vector2D(-0.5, -0.5))
                .innerProduct(textSize),
        );
        ctx.font = `${this.fontSize} ${this.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.style;
        ctx.fillText(
            this.content,
            translatedTextPosition.x,
            translatedTextPosition.y,
        );
    }
}
