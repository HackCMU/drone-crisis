import { Game } from '../Game';
import { Vector2D } from '../Vector2D';
import { Component } from './Component';
import { Depth } from './Depth';

export abstract class Positioned extends Component {
  public constructor(
    public depth: Depth,
    public position: Vector2D,
  ) {
    super(depth);
  }
  public setPosition(newPosition: Vector2D) {
    this.position = newPosition;
  }
  public abstract renderAtPosition(
    ctx: CanvasRenderingContext2D,
    game: Game,
  ): void;
  public render(ctx: CanvasRenderingContext2D, game: Game) {
    ctx.translate(-this.position.x, -this.position.y);
    this.renderAtPosition(ctx, game);
    ctx.translate(this.position.x, this.position.y);
  }
}
