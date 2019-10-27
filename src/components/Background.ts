import { Game } from '../Game';
import { getImage } from '../Image';
import { Rect2D } from '../Rect2D';
import { Vector2D } from '../Vector2D';
import { Component } from './Component';
import { Depth } from './Depth';

class Background extends Component {
    private static parallexScaleConstant = new Vector2D(1.1, 1.1);

    constructor(depth: Depth, frame: Rect2D) {
        super(depth, frame);
    }

    public render(ctx: CanvasRenderingContext2D, game: Game) {
        const layerImage = getImage('building_total.png');
        const scaleCoefficient = this.depth - Depth.BUILDING_1;
        // ctx.drawImage()
    }

    public update(deltaMs: number, game: Game) {
    }
}
