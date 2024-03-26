import 'phaser';
import {Game} from "../index";
import BaseScene from './BaseScene';

export default class EndScene extends BaseScene {

    constructor(customGame: Game) {
        super(customGame);
    }

    create() {
        const endText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, " Merci d'avoir joué !\n\nLa page se rechargera\n  dans 5 secondes.", {
            fontSize: "32px",
            color: "#000000",
            backgroundColor: "#ffffff",
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5, 0.5);
        for (const scene of this.customGame.scene.getScenes(false)) {
            if (scene.scene.key === "EndScene") continue;
            scene.scene.stop();
        }
        setTimeout(() => {
            window.location.reload();
        }, 5_000);
    }

}