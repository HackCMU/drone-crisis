import {Background} from '../components/Background';
import {Depth} from '../components/Depth';
import {Drone} from '../components/Drone';
import {Obstacle} from '../components/Obstacle';
import {Person} from '../components/Person';
import {White} from '../components/White';
import {Game} from '../Game';
import {getImage} from '../Image';
import {Rect2D} from '../Rect2D';
import {Vector2D} from '../Vector2D';
import {Scene} from './Scene';

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

    private static personConfigs: Array<{ left: number, right: number, height: number }> = [
        {left: 39, right: 512, height: 840},
        {left: 0, right: 357, height: 488},
        {left: 0, right: 360, height: 644},
        {left: 363, right: 713, height: 544},
        {left: 0, right: 200, height: 533},
        {left: 41, right: 578, height: 420},
        {left: 44, right: 512, height: 456},
    ];

    public createPerson(base: number, configIdx: number) {
        const config = Scene1.personConfigs[configIdx];
        console.log(config);
        const left = config.left;
        const right = config.right;
        const height = config.height;
        this.addComponent(new Person(Depth.FRONT, new Vector2D(rand(base + left, base + right), 1930 - height), rand(3.5, 7), base + left, base + right));
    }

    public sceneDidLoad(): void {
        for (let i = 20; i < 7000; i += Math.random() * 100 + 550) {
            const id = 1 + Math.floor(Math.random() * 7);
            switch (id) {
                case 1:
                    this.createPerson(i, 0);
                    break;
                case 2:
                    this.createPerson(i, 1);
                    break;
                case 3:
                    if (Math.random() < 0.5) {
                        this.createPerson(i, 2);
                    } else {
                        this.createPerson(i, 3);
                    }
                    break;
                case 4:
                    this.createPerson(i, 4);
                    break;
                case 5:
                    this.createPerson(i, 5);
                    break;
                case 6:
                    this.createPerson(i, 6);
                    break;
            }
            this.addComponent(new Obstacle(`building_0${id}`, i, 2100, true));
        }
        this.addComponent(new Background(Depth.SKY, getImage('sky')));
        this.addComponent(new Background(Depth.BUILDING_1, getImage('building_total')));
        this.addComponent(new Background(Depth.BUILDING_2, getImage('2Artboard 1')));
        this.addComponent(new White(Depth.WHITE, new Rect2D(Vector2D.zero, Vector2D.zero)));

        this.addComponent(new Drone(new Rect2D(new Vector2D(50, 1200), new Vector2D(60, 60))));
    }
}
