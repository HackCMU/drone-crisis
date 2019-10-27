import { Game } from '../Game';
import { getImage } from '../Image';
import { Rect2D } from '../Rect2D';
import { Component } from './Component';
import { Depth } from './Depth';

export class Obstacle extends Component {
  public update(): void {}
  public render(ctx: CanvasRenderingContext2D, game: Game): void {
    ctx.drawImage(this.image, 0, 0);
  }
  private image: HTMLImageElement;
  public constructor(imageName: string, x: number, y: number, bottomAlign: boolean) {
    const image = getImage(imageName);
    super(Depth.FRONT, new Rect2D(x, bottomAlign ? y - image.height : y, image.width, image.height));
    this.image = image;
  }
}
