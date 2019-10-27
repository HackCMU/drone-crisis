import { Component } from './Component';

export class White extends Component {
  public update(deltaMs: number, game: import('../Game').Game): void { }
  public render(ctx: CanvasRenderingContext2D, game: import('../Game').Game): void {
    ctx.resetTransform();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
