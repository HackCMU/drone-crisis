import {Depth} from '../components/Depth';
import {Text} from '../components/Text';
import {TextButton} from '../components/TextButton';
import {Game} from '../Game';
import {Vector2D} from '../Vector2D';
import {Scene} from './Scene';
import {Scene1} from './Scene1';
import {White} from "../components/White";
import {Rect2D} from "../Rect2D";

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
        const gameTitle = new Text(
            Depth.FRONT,
            this.dimensions.innerProduct(new Vector2D(0.5, 0.48)),
            'Done Crisis',
        );
        gameTitle.fontSize = 60;
        gameTitle.style = '#a0a0a0';
        const startGameButton = new TextButton(
            Depth.FRONT,
            this.dimensions.innerProduct(new Vector2D(0.5, 0.51)),
            'START',
            this.onButtonTapped,
        );
        startGameButton.fontSize = 30;
        startGameButton.style = '#f0f0f0';
        const backgroundLayer = new White(
            Depth.WHITE,
            new Rect2D(Vector2D.zero, this.dimensions),
        );
        backgroundLayer.fillStyle = '#000000';
        backgroundLayer.alpha = 1.0;
        this.addComponent(gameTitle);
        this.addComponent(startGameButton);
        this.addComponent(backgroundLayer);
    }

    public sceneWillAppear() {
        super.sceneWillAppear();
        this.game.setCamera(this.dimensions.multiplying(0.5), 1.0);
    }

    public onButtonTapped = (source: TextButton) => {
        this.game.transitionToScene(new Scene1(this.game));
    }
}
