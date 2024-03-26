import "phaser";
import {Game} from "../index";
import DeskGameScene from "./DeskGameScene";
import Dialogue from "../utils/structures/Dialogue";

export default class RightAnswerGameScene extends DeskGameScene {
    constructor(customGame: Game, dialogue: Dialogue, endGameScene?: string) {
        super(customGame, dialogue, endGameScene);
    }

    create() {
        super.create();
        this.customGame.incrementScore();
    }

    update() {
        super.update();
    }

}