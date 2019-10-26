import { Game } from '../Game';
import { getImage } from '../Image';
import { Key } from '../Keyboard';
import { Component } from './Component';
import { Depth } from './Depth';

export class TestSquare extends Component {
  private x: number;
  private y: number;
  public update(deltaMs: number, game: Game): void {
    if (game.keyboard.isKeyPressed(Key.A)) {
      this.x -= deltaMs * 0.2;
    }
    if (game.keyboard.isKeyPressed(Key.D)) {
      this.x += deltaMs * 0.2;
    }
    if (game.keyboard.isKeyPressed(Key.W)) {
      this.y -= deltaMs * 0.2;
    }
    if (game.keyboard.isKeyPressed(Key.S)) {
      this.y += deltaMs * 0.2;
    }
  }
  public render(ctx: CanvasRenderingContext2D, game: Game): void {
    ctx.fillStyle = `rgb(255, ${Math.random() * 255}, 128)`;
    ctx.drawImage(getImage('building1'), this.x, this.y);
  }
  public constructor(depth: Depth) {
    super(depth);
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
  }
}
