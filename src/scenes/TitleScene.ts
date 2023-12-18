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
        const scaleX = this.cameras.main.width / backgroundImage.width;

        backgroundImage.setScale(scaleX, scaleY);
        backgroundImage.preFX?.addBlur(0);
        backgroundImage.postFX?.addBlur(0);
        
        if (backgroundImage.width < this.cameras.main.width) {
            backgroundImage.setX((this.cameras.main.width - backgroundImage.width) / 2);
        }

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

        // Bouton 'Play'
        const playButton = this.add.text(this.cameras.main.centerX, 300, 'Play', { font: '32px Arial', color: '#000000' }) // Couleur modifiée en noir
            .setInteractive()
            .setOrigin(0.5, 0.5);

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Bouton 'Credits'
        const creditsButton = this.add.text(this.cameras.main.centerX, 400, 'Credits', { font: '32px Arial', color: '#000000' }) // Couleur modifiée en noir
            .setInteractive()
            .setOrigin(0.5, 0.5);

        creditsButton.on('pointerdown', () => {
            console.log("Credits button clicked");
        });

        console.log("Title screen added");
    }
}