import 'babel-polyfill';
import {Depth} from './components/Depth';
import {Drone} from './components/Drone';
import {TestSquare} from './components/TestSquare';
import {Game} from './Game';
import {loadImages} from './Image';
import {Rect2D} from './Rect2D';
import {Vector2D} from './Vector2D';

(async () => {
    await loadImages();

    const game: Game = new Game(new Vector2D(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', () => {
        game.setCanvasDimension(new Vector2D(window.innerWidth, window.innerHeight));
    });

    // game.addComponent(new TestSquare(Depth.SKY, game.frame));
    // game.addComponent(new TestSquare(Depth.BUILDING_2, new Rect2D(game.frame.center, Vector2D.zero)));
    game.addComponent(new Drone(new Rect2D(game.frame.center, new Vector2D(20, 20))));
})();
