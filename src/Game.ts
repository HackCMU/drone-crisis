import { Component } from './components/Component';
import { Depth } from './components/Depth';
import { Keyboard } from './Keyboard';
import { Rect2D } from './Rect2D';
import { Scene } from './scenes/Scene';
import { Vector2D } from './Vector2D';

export class Game {
  /** Used this to get the state of keyboard */
  public readonly keyboard: Keyboard = new Keyboard();
  public frame: Rect2D;
  /** Components in this game */
  private components: Set<Component> = new Set();
  /** Different layers */
  private canvases: Array<[HTMLCanvasElement, CanvasRenderingContext2D]> = [];
  /** The scene that is currently being presented */
  private scene?: Scene;
  /** Render all components */
  private render() {
    this.canvases.forEach(canvas => canvas[1].clearRect(
      0, 0, canvas[0].width, canvas[0].height,
    ));
    // Render self owned components
    for (const component of this.components.values()) {
      this.renderComponent(component, this.canvases[component.depth][1]);
    }
    // Render scene components
    if (this.scene != null) {
      for (const component of this.scene.components.values()) {
        this.renderComponent(component, this.canvases[component.depth][1]);
      }
    }
  }
  /** Last time in ms update() is called */
  private lastUpdate: number = Date.now();
  /** Update all components */
  private update() {
    const now = Date.now();
    const deltaMs = now - this.lastUpdate;
    this.lastUpdate = now;
    for (const component of this.components.values()) {
      component.update(deltaMs, this);
    }
  }
  private loop = () => {
    this.update();
    this.render();
    requestAnimationFrame(this.loop);
  }
  /** Set the dimensions of all canvases */
  public setCanvasDimension(newDimensions: Vector2D) {
    this.frame = new Rect2D(Vector2D.zero, newDimensions);
    this.canvases.forEach(canvas => {
      canvas[0].width = newDimensions.x;
      canvas[0].height = newDimensions.y;
    });
    this.render();
  }
  public constructor(dimensions: Vector2D) {
    this.frame = new Rect2D(Vector2D.zero, dimensions);
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
        container.appendChild(canvas);
      });
    document.body.appendChild(container);
    requestAnimationFrame(this.loop);
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
    context.translate(component.frame.x, component.frame.y);
    component.render(context, this);
    context.restore();
  }
}
