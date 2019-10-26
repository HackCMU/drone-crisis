import { Component } from '../components/Component';
import { Game } from '../Game';
import { Scene } from './Scene';

export class IntroScene extends Scene {
    public components: Set<Component> = new Set<Component>();

    public sceneDidLoad(): void {

    }
}
