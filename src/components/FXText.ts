import { Game } from '../Game';
import { Fragment } from './Fragment';
import { Text } from './Text';
import {Vector2D} from "../Vector2D";

export class FXText extends Text {
    public update(deltaMs: number, game: Game) {
        const randXY = new Vector2D(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        ).innerProduct(this.frame.size);
        Fragment.createExplosion(game, this.frame.center.adding(randXY), 5, 4);
    }
}
