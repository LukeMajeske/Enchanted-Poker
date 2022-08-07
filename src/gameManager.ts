import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";

export class GameManager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    // Safely store variables for our game
    private static app: Application;
    private static currentScene: IScene;

    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;


    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return GameManager._width;
    }
    public static get height(): number {
        return GameManager._height;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        // store our width and height
        GameManager._width = width;
        GameManager._height = height;

        // Create our pixi app
        GameManager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        // Add the ticker
        GameManager.app.ticker.add(GameManager.update)
    }

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (GameManager.currentScene) {
            GameManager.app.stage.removeChild(GameManager.currentScene);
            GameManager.currentScene.destroy();
        }

        // Add the new one
        GameManager.currentScene = newScene;
        GameManager.app.stage.addChild(GameManager.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed:number): void {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (GameManager.currentScene) {
            GameManager.currentScene.update(framesPassed);
        }

        // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
    }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
}