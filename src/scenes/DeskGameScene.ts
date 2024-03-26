import {Game} from "../index";
import Dialogue from "../utils/structures/Dialogue";
import { GameScene } from "./GameScene";

export default class DeskGameScene extends GameScene {

    constructor(customGame: Game, dialogue: Dialogue, endGameScene?: string) {
        super(customGame, { dialogue, endGameScene });
    }

    create() {
        const backgroundImage = this.add.image(0, 0, "OfficeBackgroundBack").setOrigin(0, 0);
        const scaleY = this.cameras.main.height / backgroundImage.height;
        const scaleX = this.cameras.main.width / backgroundImage.width;
        backgroundImage.setScale(scaleX, scaleY);

        backgroundImage.preFX?.addBlur(1);
        backgroundImage.postFX?.addBlur(1);

        super.create();
    }

    update() {
        super.update();
    }

}