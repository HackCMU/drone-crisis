import { Game } from '../Game';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import { Depth } from './Depth';

export abstract class Component {
  public constructor(public readonly depth: Depth, public frame: Rect2D) {}
  public abstract update(deltaMs: number, game: Game): void;
  public abstract render(ctx: CanvasRenderingContext2D, game: Game): void;
  public translateFrame(x: number, y: number): void;
  public translateFrame(byVector: Vector2D): void;
  /** Adjust the frame */
  public translateFrame(xOrVecotor: number | Vector2D, y?: number) {
    if (xOrVecotor instanceof Vector2D) {
      this.frame = this.frame.translate(xOrVecotor);
    } else if (typeof y === 'number') {
      this.frame = this.frame.translate(new Vector2D(xOrVecotor, y));
    }
  }
}
