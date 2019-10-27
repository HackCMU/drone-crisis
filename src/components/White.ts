import { Component } from './Component';

export class White extends Component {
  public alpha = 0.5;
  public fillStyle = 'white';

  public update(deltaMs: number, game: import('../Game').Game): void { }
  public render(ctx: CanvasRenderingContext2D, game: import('../Game').Game): void {
    ctx.resetTransform();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
