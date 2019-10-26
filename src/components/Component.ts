import { Game } from '../Game';
import { Depth } from './Depth';

export abstract class Component {
  public constructor(public readonly depth: Depth) {}
  public abstract update(deltaMs: number, game: Game): void;
  public abstract render(ctx: CanvasRenderingContext2D, game: Game): void;
}
