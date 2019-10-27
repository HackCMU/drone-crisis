import { Game } from '../Game';
import { Rect2D } from '../Rect2D';
import { Vector2D } from '../Vector2D';
import { Component } from './Component';
import { Depth, getDepthTranslatingFactor } from './Depth';

export class Background extends Component {
    constructor(
        depth: Depth,
        private image: HTMLImageElement,
    ) {
        super(depth, new Rect2D(Vector2D.zero, new Vector2D(image.width, image.height)));
    }

    public render(ctx: CanvasRenderingContext2D, game: Game) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -400 * this.depth, -300 * this.depth, this.image.width * this.depth / 2, this.image.height * this.depth / 2);
    }

    public update(deltaMs: number, game: Game) {
    }
}
