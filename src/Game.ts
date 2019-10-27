import { Bullet } from './components/Bullet';
import { Component } from './components/Component';
import { Depth, getDepthTranslatingFactor } from './components/Depth';
import { Person } from './components/Person';
import { Keyboard } from './Keyboard';
import { MonoDimensionTransitionControl } from './MonoDimensionTransitionControl';
import { Rect2D } from './Rect2D';
import { Scene } from './scenes/Scene';
import { Vector2D } from './Vector2D';

export class Game {
    /** Used this to get the state of keyboard */
    public readonly keyboard: Keyboard = new Keyboard();
    /** Components in this game */
    public components: Set<Component> = new Set();
    /** Different layers */
    private canvases: Array<[HTMLCanvasElement, CanvasRenderingContext2D]> = [];
    /** The scene that is currently being presented */
    public scene?: Scene;

    public cameraCenter: Vector2D = Vector2D.zero;
    public cameraScale: number = 1;

    private cameraCenterXTransition = new MonoDimensionTransitionControl(0, 10000);
    private cameraCenterYTransition = new MonoDimensionTransitionControl(0, 10000);

    public constructor(dimensions: Vector2D) {
        const container = document.createElement('div');
        Object
            .keys(Depth)
            .map(Number)
            .filter(key => !Number.isNaN(key))
            .sort((a, b) => a - b)
            .forEach(key => {
                const canvas = document.createElement('canvas');
                canvas.width = dimensions.x;
                canvas.height = dimensions.y;
                this.canvases[key] = [
                    canvas,
                    canvas.getContext('2d')!,
                ];
                container.prepend(canvas);
            });
        document.body.appendChild(container);
        requestAnimationFrame(this.loop);
        window.addEventListener('mouseup', this.onMouseUpEvent);
    }

    public setCamera(newCenter: Vector2D, scale: number) {
        this.cameraCenterXTransition = new MonoDimensionTransitionControl(newCenter.x, 10000);
        this.cameraCenterYTransition = new MonoDimensionTransitionControl(newCenter.y, 10000);
        this.cameraScale = scale;
    }
    public moveCamera(newCenter: Vector2D, scale: number) {
        this.cameraCenterXTransition.setTarget(newCenter.x);
        this.cameraCenterYTransition.setTarget(newCenter.y);
        this.cameraScale = scale;
    }

    /** Render all components */
    private render() {
        this.canvases.forEach(canvas => canvas[1].clearRect(
            0, 0, canvas[0].width, canvas[0].height,
        ));
        // Render scene components
        if (this.scene != null) {
            for (const component of this.scene.components.values()) {
                this.renderComponent(component, this.canvases[component.depth][1]);
            }
        }
        // Render self owned components
        for (const component of this.components.values()) {
            this.renderComponent(component, this.canvases[component.depth][1]);
        }
    }

    // Check collisions between components
    private checkCollisions(): void {
        for (const person of this.components) {
            if (person instanceof Person) {
                for (const bullet of this.components) {
                    if (bullet instanceof Bullet) {
                        const x = bullet.frame.x;
                        const y = bullet.frame.y;
                        const myX = person.frame.x;
                        const myY = person.frame.y;
                        const w = person.frame.width;
                        const h = person.frame.height;
                        if (x <= myX + w && x >= myX && y <= myY + h && y >= myY) {
                            person.die();
                            bullet.hasExpired = true;
                        }
                    }
                }
            }
        }
    }

    /** Last time in ms update() is called */
    private lastUpdate: number = Date.now();

    /** Update all components */
    private update() {
        this.cameraCenter.x = Math.max(this.cameraCenterXTransition.getValue(), window.innerWidth / 2 / this.cameraScale);
        this.cameraCenter.y = Math.min(this.cameraCenterYTransition.getValue(), this.scene!.dimensions.height - window.innerHeight / 2 / this.cameraScale);
        // if ((x + width) > game.scene!.dimensions.x) {
        //     x -= x + width - game.scene!.dimensions.x;
        // }
        // if (x < 0) {
        //     x = 0;
        // }
        const now = Date.now();
        const deltaMs = now - this.lastUpdate;
        this.lastUpdate = now;
        for (const component of this.components.values()) {
            component.update(deltaMs, this);
        }
        if (this.scene != null) {
            for (const component of this.scene.components.values()) {
                component.update(deltaMs, this);
            }
        }
    }

    private loop = () => {
        this.update();
        this.render();
        requestAnimationFrame(this.loop);
    }

    /** Set the dimensions of all canvases */
    public setCanvasDimension(newDimensions: Vector2D) {
        this.canvases.forEach(canvas => {
            canvas[0].width = newDimensions.x;
            canvas[0].height = newDimensions.y;
        });
        this.render();
    }

    /** Add a component to the game */
    public addComponent(component: Component) {
        this.components.add(component);
    }

    /** Remove a component from the game */
    public removeComponent(component: Component) {
        this.components.delete(component);
    }

    /** Render the component within the context */
    private renderComponent(component: Component, context: CanvasRenderingContext2D) {
        context.save();
        // context.translate(
        //     component.frame.x - (this.cameraCenter.x * getDepthTranslatingFactor(component.depth) - window.innerWidth / 2),
        //     component.frame.y - (this.cameraCenter.y * getDepthTranslatingFactor(component.depth) - window.innerHeight / 2),
        // );
        // context.setTransform(
        //     this.cameraScale, 0,
        //     0, this.cameraScale,
        //     component.frame.x - (this.cameraCenter.x - window.innerWidth / 2) - component.frame.width / 2,
        //     component.frame.y - (this.cameraCenter.y - window.innerHeight / 2) - component.frame.height / 2,
        // );
        const translatingFactor = getDepthTranslatingFactor(component.depth);
        const cameraScale = this.cameraScale;
        // const cameraScale = this.cameraScale;
        context.translate(
            window.innerWidth / 2 + cameraScale * (component.frame.x - this.cameraCenter.x * translatingFactor),
            window.innerHeight / 2 + cameraScale * (component.frame.y - this.cameraCenter.y * translatingFactor),
        );
        context.scale(cameraScale, cameraScale);

        // context.translate(
        //     component.frame.width / 2,
        //     component.frame.height / 2,
        // );
        component.render(context, this);
        context.restore();
    }

    private onMouseUpEvent = (event: MouseEvent) => {
        const bounds = this.getBounds();
        const position = (new Vector2D(event.clientX, event.clientY))
            .multiplying(this.cameraScale)
            .adding(bounds.origin);
        console.log(bounds, position);
        const component = this.componentAtPosition(position);
        if (typeof component !== 'undefined') {
            component.didSelect();
        }
    }

    public getBounds(): Rect2D {
        const size = new Vector2D(window.innerWidth, window.innerHeight);
        return new Rect2D(
            this.cameraCenter
                .adding(size.multiplying(-0.5)),
            size,
        );
    }

    public transitionToScene(scene: Scene) {
        if (this.scene != null) {
            this.scene.sceneWillDisappear();
        }
        this.scene = scene;
        scene.sceneDidLoad();
        // The following is supposed to be called after the animation ended
        // Animations hasn't been implemented yet
        scene.sceneWillAppear();
    }

    public componentAtPosition(position: Vector2D): Component | undefined {
        const hitComponents = new Array<Component>();
        for (const component of this.components.values()) {
            if (component.frame.contains(position)) {
                hitComponents.push(component);
            }
        }
        if (this.scene != null) {
            for (const component of this.scene.components.values()) {
                if (component.frame.contains(position)) {
                    hitComponents.push(component);
                }
            }
        }
        return hitComponents.length > 0 ?
            hitComponents.reduce((a, b) => a.depth < b.depth ? a : b) : undefined;
    }
}
