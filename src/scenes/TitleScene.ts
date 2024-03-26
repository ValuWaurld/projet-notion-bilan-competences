import "phaser";
import {Game} from "../index";
import BaseScene from "./BaseScene";

export type KhaledEmotions = "CV" | "angry" | "cry" | "happy" | "idea" | "sad" | "shock" | "sigh" | "smirk" | "stress" | "sweat" | "wave" | "wink" | "yawn";
export type ValentinEmotions = "CV" | "angry" | "call" | "cry" | "facepalm" | "happy" | "hesitate" | "idea" | "sad" | "sigh" | "smirk" | "sweat" | "wave" | "wink" | "yawn";

interface Avatars {
    "Khaled": KhaledEmotions[],
    "Valentin": ValentinEmotions[]

}

const avatars: Avatars = {
    "Khaled": ["CV", "angry", "cry", "happy", "idea", "sad", "shock", "sigh", "smirk", "stress", "sweat", "wave", "wink", "yawn"],
    "Valentin": ["CV", "angry", "call", "cry", "facepalm", "happy", "hesitate", "idea", "sad", "sigh", "smirk", "sweat", "wave", "wink", "yawn"]
}

export default class TitleScene extends BaseScene {

    constructor(customGame: Game) {
        super(customGame, { key: "TitleScene" });
    }

    preload() {
        this.load.image("OfficeBackgroundFront", require("../assets/OfficeBackgroundFront.png"));
        this.load.image("OfficeBackgroundBack", require("../assets/OfficeBackgroundBack.png"));
        for (const avatarName in avatars) {
            // @ts-ignore : avatarName is a key of avatars
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

        const titleStyle:  Phaser.Types.GameObjects.Text.TextStyle = {
            font: "6em Arial",
            color: "#333",
            align: "center",
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000",
                blur: 2,
                stroke: true,
                fill: true
            },
            backgroundColor: "#eee",
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        };

        const titleText = this.add.text(this.cameras.main.centerX, 200, "Jeu de l'entretien", titleStyle).setOrigin(0.5, 0.5);
        const creditsText = this.add.text(this.cameras.main.centerX, this.cameras.main.height - 200, "Par Khaled et Valentin", titleStyle).setOrigin(0.5, 0.5);

        const buttonStyle = {
            fontFamily: 'Arial, sans-serif',
            fontSize: '6em',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#007bff', // Button background color
            padding: {
                x: 20,
                y: 10
            },
            borderRadius: 5,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: 1
        };

        // the cursor will change to a pointer when hovering the button
        const playButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'JOUER', buttonStyle)
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)

        playButton.on('pointerdown', () => {
            this.scene.start("WelcomeGameScene");
        });

    }
}