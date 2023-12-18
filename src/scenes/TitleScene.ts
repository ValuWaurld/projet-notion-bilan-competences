import "phaser";
import { BaseScene } from "./BaseScene";

export class TitleScene extends BaseScene {

    constructor() {
        super({ key: "TitleScene" });
    }

    preload() {
        this.load.image("OfficeBackground", require("../assets/OfficeBackground.png"));
    }

    create() {
        const backgroundImage = this.add.image(0, 0, "OfficeBackground").setOrigin(0, 0);
        const scaleY = this.cameras.main.height / backgroundImage.height;

        backgroundImage.setScale(1, scaleY);
        backgroundImage.preFX?.addBlur(0);
        backgroundImage.postFX?.addBlur(0);
        
        // Center background if needed
        if (backgroundImage.width < this.cameras.main.width) {
            backgroundImage.setX((this.cameras.main.width - backgroundImage.width) / 2);
        }

        // Add title text
        const titleText = this.add.text(this.cameras.main.centerX, 100, "MY GAME", {
            fontSize: "64px",
            color: "#000000",
            backgroundColor: "#ffffff",
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        });
        titleText.setOrigin(0.5, 0.5);

        const playButton = this.add.sprite(this.cameras.main.centerX, 300, "playButton").setInteractive();
        playButton.setOrigin(0.5, 0.5);
        playButton.on("pointerdown", () => {
            this.scene.start('GameScene');
        });

        const creditsButton = this.add.sprite(this.cameras.main.centerX, 500, "creditsButton").setInteractive();
        creditsButton.setOrigin(0.5, 0.5);
        creditsButton.on("pointerdown", () => {
            console.log("Credits button clicked");
        });

        console.log("Title screen added");
    }

}