import "phaser";
import { BaseScene } from "./BaseScene";

const avatars: { [key: string]: string[] } = {
    "Khaled": ["CV", "angry", "cry", "facepalm", "happy", "sad", "sigh", "smile", "stress", "wink"],
    "Valentin": ["CV", "angry", "big_wave", "call", "cry", "facepalm", "happy", "hesitate", "idea", "sad", "sigh", "smirk", "sweat", "wave", "wink", "yawn"]
}

export class TitleScene extends BaseScene {

    constructor() {
        super({ key: "TitleScene" });
    }

    preload() {
        this.load.image("OfficeBackgroundFront", require("../assets/OfficeBackgroundFront.png"));
        this.load.image("OfficeBackgroundBack", require("../assets/OfficeBackgroundBack.png"));
        for (const avatarName in avatars) {
            for (const avatarEmotion of avatars[avatarName]) {
                this.load.image(`${avatarName}_${avatarEmotion}`, require(`../assets/avatars/${avatarName}_${avatarEmotion}.png`));
            }
        }
    }

    create() {
        for (const backgroundName of ["OfficeBackgroundFront", "OfficeBackgroundBack"]) {
            const backgroundImage = this.add.image(0, 0, backgroundName).setOrigin(0, 0);
            const scaleY = this.cameras.main.height / backgroundImage.height;
            const scaleX = this.cameras.main.width / backgroundImage.width;

            backgroundImage.setScale(scaleX, scaleY);
            backgroundImage.preFX?.addBlur(0);
            backgroundImage.postFX?.addBlur(0);
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
        }).setOrigin(0.5, 0.5);

        const buttonStyle = {
            font: '32px Arial',
            color: '#fff',
            backgroundColor: '#0051a5',
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            },
            borderRadius: 15,
            fixedWidth: 200,
            align: 'center'
        };

        const playButton = this.add.text(this.cameras.main.centerX, 300, 'Play', buttonStyle)
            .setInteractive()
            .setOrigin(0.5, 0.5);
        playButton.on('pointerdown', () => {
            this.scene.start("WelcomeGameScene");
        });

        const creditsButton = this.add.text(this.cameras.main.centerX, 400, 'Credits', buttonStyle)
            .setInteractive()
            .setOrigin(0.5, 0.5);
        creditsButton.on('pointerdown', () => {
            console.log("Credits button clicked");
        });
    }
}