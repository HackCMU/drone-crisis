import { Background } from '../components/Background';
import { Depth } from '../components/Depth';
import { Drone } from '../components/Drone';
import { Obstacle } from '../components/Obstacle';
import { Person } from '../components/Person';
import { White } from '../components/White';
import { Game } from '../Game';
import { getImage } from '../Image';
import { Rect2D } from '../Rect2D';
import { Vector2D } from '../Vector2D';
import { Scene } from './Scene';

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export class Scene1 extends Scene {
  public constructor(game: Game) {
    super(game, new Vector2D(7000, 2000));
  }
  public sceneWillDisappear(): void {
    // throw new Error("Method not implemented.");
  }
  public sceneWillAppear(): void {
    // throw new Error("Method not implemented.");
  }
  private createPerson(base: number, left: number, right: number, height: number) {
    this.addComponent(new Person(Depth.FRONT, new Vector2D(rand(base + left, base + right), 1930 - height), rand(3.5, 7), base + left, base + right));
  }
  public sceneDidLoad(): void {
    for (let i = 20; i < 7000; i += Math.random() * 100 + 550) {
      const id = 1 + Math.floor(Math.random() * 7);
      // const id = 1;
      // this.createPerson(i, 39, 512, 602);
      if (Math.random() < 2) {
        switch (id) {
          case 1:
            this.createPerson(i, 39, 512, 840);
            break;
          case 2:
            this.createPerson(i, 0, 357, 488);
            break;
          case 3:
            if (Math.random() < 0.5) {
              this.createPerson(i, 0, 360, 644);
            } else {
              this.createPerson(i, 363, 713, 544);
            }
            break;
          case 4:
            this.createPerson(i, 0, 200, 533);
            break;
          case 5:
            this.createPerson(i, 41, 578, 420);
            break;
          case 6:
            this.createPerson(i, 44, 512, 456);
            break;
        }
      }
      this.addComponent(new Obstacle(`building_0${id}`, i, 2100, true));
    }
    this.addComponent(new Background(Depth.SKY, getImage('sky')));
    this.addComponent(new Background(Depth.BUILDING_1, getImage('building_total')));
    this.addComponent(new Background(Depth.BUILDING_2, getImage('2Artboard 1')));
    this.addComponent(new White(Depth.WHITE, new Rect2D(Vector2D.zero, Vector2D.zero)));

    this.addComponent(new Drone(new Rect2D(new Vector2D(50, 1800), new Vector2D(20, 20))));
  }
}
