import 'babel-polyfill';
import {Depth} from './components/Depth';
import {Drone} from './components/Drone';
import {Person} from './components/Person';
import {Game} from './Game';
import {loadImages} from './Image';
import {Rect2D} from './Rect2D';
import { IntroScene } from './scenes/IntroScene';
import { Scene1 } from './scenes/Scene1';
import {Vector2D} from './Vector2D';

(async () => {
    await loadImages();

    const game: Game = new Game(new Vector2D(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', () => {
        game.setCanvasDimension(new Vector2D(window.innerWidth, window.innerHeight));
    });

    // game.transitionToScene(new IntroScene(game, new Vector2D(window.innerWidth, window.innerHeight)));
    game.transitionToScene(new Scene1(game));

    // game.addComponent(new TestSquare(Depth.SKY, game.frame));
    // game.addComponent(new TestSquare(Depth.BUILDING_2, new Rect2D(game.frame.center, Vector2D.zero)));
    // game.addComponent(new Drone(new Rect2D(game.bounds.center, new Vector2D(20, 20))));
    // for (let i = 0; i <= 50; i++) {
    //     game.addComponent(new Person(Depth.FRONT, new Rect2D(new Vector2D(game.bounds.width * Math.random(), game.bounds.height * Math.random()), new Vector2D(60,  60)), 50));
    // }
})();
