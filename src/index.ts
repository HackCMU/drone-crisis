import { Depth } from './components/Depth';
import { TestSquare } from './components/TestSquare';
import { Game } from './Game';
import { Vector2D } from './Vector2D';

const game: Game = new Game(new Vector2D(window.innerWidth, window.innerHeight));
window.addEventListener('resize', () => {
  game.setCanvasDimension(new Vector2D(window.innerWidth, window.innerHeight));
});

game.addComponent(new TestSquare(Depth.SKY));
game.addComponent(new TestSquare(Depth.BUILDING_2));
