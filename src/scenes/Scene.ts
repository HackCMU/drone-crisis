import {Component} from '../components/Component';
import {Game} from '../Game';
import { Vector2D } from '../Vector2D';

/**
 * A scene is an object representing each distinctive stages of the Game
 *
 * The scene manages its own components, which are requested and rendered
 * by the `Game` object.
 */
export abstract class Scene {
    public constructor(
        public readonly game: Game,
        public readonly dimensions: Vector2D,
    ) { }

    /** Return the list of components owned by this scene for rendering */
    public components: Set<Component> = new Set<Component>();
    /**
     * Invoked when the scene is added to the game.
     *
     * This is when the scene loads & initialize all of its components.
     */
    public sceneDidLoad() { }
    /** Invoked when the scene is about to be unloaded from the Game */
    public sceneWillDisappear() { }
    /** Invoked when the scene is added to the Game and will be presented to the user */
    public sceneWillAppear() { }
    public addComponent(component: Component) {
        this.components.add(component);
    }
    public removeComponent(component: Component) {
        this.components.delete(component);
    }
}
