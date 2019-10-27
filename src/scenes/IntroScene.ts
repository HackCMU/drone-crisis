import { Background } from '../components/Background';
import { Depth } from '../components/Depth';
import { getImage } from '../Image';
import { Scene } from './Scene';
import { TextButton } from '../components/TextButton';
import { Scene1 } from './Scene1';
import {Game} from "../Game";
import {Vector2D} from "../Vector2D";

export class IntroScene extends Scene {
    constructor(game: Game) {
        super(game, new Vector2D(8000, 5000));
    }

    public sceneDidLoad() {
        super.sceneDidLoad();
        // this.addComponent(
        //     new Background(Depth.SKY, getImage('sky')),
        // );
        // this.addComponent(
        //     new Background(Depth.BUILDING_2, getImage('building_total')),
        // );
        const startGameButton = new TextButton(
            Depth.FRONT,
            this.dimensions.multiplying(0.5),
            'START',
            this.onButtonTapped,
        );
        startGameButton.fontSize = 30;
        this.addComponent(startGameButton);
    }

    public sceneWillAppear() {
        super.sceneWillAppear();
        this.game.setCamera(this.dimensions.multiplying(0.5), 1.0);
    }

    public onButtonTapped = (source: TextButton) => {
        this.game.transitionToScene(new Scene1(this.game));
    }
}
