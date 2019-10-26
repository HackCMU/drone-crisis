import { Game } from '../Game';
import { getImage } from '../Image';
import { Key } from '../Keyboard';
import { Rect2D } from '../Rect2D';
import { Component } from './Component';
import { Depth } from './Depth';

export class TestSquare extends Component {
  public update(deltaMs: number, game: Game): void {
    if (game.keyboard.isKeyPressed(Key.A)) {
      this.translateFrame(deltaMs * -0.2, 0);
    }
    if (game.keyboard.isKeyPressed(Key.D)) {
      this.translateFrame(deltaMs * 0.2, 0);
    }
    if (game.keyboard.isKeyPressed(Key.W)) {
      this.translateFrame(0, deltaMs * -0.2);
    }
    if (game.keyboard.isKeyPressed(Key.S)) {
      this.translateFrame(0, deltaMs * 0.2);
    }
  }
  public render(ctx: CanvasRenderingContext2D, game: Game): void {
    ctx.fillStyle = `rgb(255, ${Math.random() * 255}, 128)`;
    ctx.drawImage(getImage('building1'), 0, 0);
  }
  public constructor(depth: Depth, frame: Rect2D) {
    super(depth, frame);
  }
}
