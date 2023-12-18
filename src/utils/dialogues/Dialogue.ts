import "phaser";
import DialogueElement from "./DialogueElement";
import { GameScene } from "~/scenes/GameScene";

export default class Dialogue {

    public gameScene: GameScene | null;
    public elements: DialogueElement[];
    public currentIndex = 0;

    constructor(gameScene?: GameScene) {
        this.elements = [];
        this.gameScene = gameScene ?? null;
    }

    public addElement(element: DialogueElement) {
        this.elements.push(element);
        return this;
    }

    public addElements(...elements: DialogueElement[]) {
        elements.forEach((element) => this.addElement(element));
        return this;
    }

    public setGameScene(gameScene: GameScene) {
        this.gameScene = gameScene;
        return this;
    }
    
    public getCurrentElement() {
        if (this.currentIndex >= this.elements.length) return undefined;
        return this.elements[this.currentIndex];
    }

    public incrementIndex() {
        this.currentIndex += 1;
    }

    public updateIndex(index: integer) {
        this.currentIndex = index;
    }

    public start(gameScene: GameScene) {
        
    }

}
