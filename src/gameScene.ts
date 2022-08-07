import { Container, Sprite } from "pixi.js";
import { IScene, GameManager } from "./gameManager";

export class GameScene extends Container implements IScene {
    private clampy: Sprite;
    private clampyVelocity: number;
    constructor() {
        super();
    }
    public update(framesPassed: number): void {

    }
}