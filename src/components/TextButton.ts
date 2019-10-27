import { Vector2D } from '../Vector2D';
import { Depth } from './Depth';
import { Text } from './Text';

export class TextButton extends Text {
    constructor(
        depth: Depth,
        origin: Vector2D,
        content: string,
        public callback: (source: TextButton) => void,
    ) {
        super(depth, origin, content);
        console.log(this.frame);
    }

    public didSelect() {
        this.callback(this);
    }
}
