import {Component} from '../components/Component';
import {Game} from '../Game';

/**
 * A scene is an object representing each distinctive stages of the Game
 *
 * The scene manages its own components, which are requested and rendered
 * by the `Game` object.
 */
export abstract class Scene {
    public constructor(
        public readonly parent: Game,
    ) { }

    /** Return the list of components owned by this scene for rendering */
    public components: Set<Component> = new Set<Component>();
    /**
     * Invoked when the scene is added to the game.
     *
     * This is when the scene loads & initialize all of its components.
     */
    public abstract sceneDidLoad(): void;
    protected addComponent(component: Component) {
        this.components.add(component);
    }
    protected removeComponent(component: Component) {
        this.components.delete(component);
    }
}
