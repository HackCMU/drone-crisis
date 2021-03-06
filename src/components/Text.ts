import { Component } from './Component';
import { Vector2D } from '../Vector2D';
import { Depth } from './Depth';
import { Rect2D } from '../Rect2D';
import { Game } from '../Game';

export class Text extends Component {
    public fontSize: number = 15;
    public fontFamily: string = 'sans-serif';
    public style: string = '#0a0a0a';

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

    public render(ctx: CanvasRenderingContext2D, game: Game) {
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.style;
        const canvasTextSize = ctx.measureText(this.content);
        const textSize = new Vector2D(canvasTextSize.width, this.fontSize + 10);
        const translatedTextPosition = this.anchor.innerProduct(textSize);
        this.frame.origin.add(
            textSize
                .adding(this.frame.size.multiplying(-1))
                .multiplying(-0.5),
        );
        this.frame.size = textSize;
        // ctx.fillRect(0, 0, textSize.width, textSize.height)
        ctx.fillText(
            this.content,
            translatedTextPosition.x,
            translatedTextPosition.y,
        );
    }
}
