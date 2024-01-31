import Dialogue from "../utils/dialogues/Dialogue";
import { GameScene } from "./GameScene";
import DialogueElement from "../utils/dialogues/DialogueElement";
import DialogueSpeaker from "../utils/dialogues/DialogueSpeaker";
import DialogueSpeech from "../utils/dialogues/DialogueSpeech";
import DialogueChoice from "../utils/dialogues/DialogueChoice";

const khaledSpeaker = new DialogueSpeaker()
    .setName("Khaled");

const dialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setSpeaker(khaledSpeaker)
            .setSpeech(new DialogueSpeech().setText("Hello!").setEmotion("happy")),
        new DialogueElement()
            .setSpeaker(khaledSpeaker)
            .setSpeech(new DialogueSpeech().setText("How are you?").setEmotion("smiling")),
        new DialogueElement()
            .setSpeaker(khaledSpeaker)
            .setSpeech(new DialogueSpeech().setText("Do you want to play a game?").setEmotion("winking"))
            .setChoices(
                new DialogueChoice()
                    .setAnswer("Yes")
                    .setIncrementAfterAction(true)
                    .setAction((_) => console.log("Clicked 'Yes'")),
                new DialogueChoice()
                    .setAnswer("No")
                    .setIncrementAfterAction(true)
                    .setAction((_) => console.log("Clicked 'No'")),
            ),
        new DialogueElement()
            .setSpeaker(khaledSpeaker)
            .setSpeech(new DialogueSpeech().setText("Cool. See you later!").setEmotion("smiling")),
    );

export default class TestGameScene extends GameScene {

    constructor() {
        super({ key: "TestGameScene", dialogue });
    }

    create() {
        // Ajouter l'image de fond
        const backgroundImage = this.add.image(0, 0, "OfficeBackground").setOrigin(0, 0);
        const scaleY = this.cameras.main.height / backgroundImage.height;
        const scaleX = this.cameras.main.width / backgroundImage.width;
        backgroundImage.setScale(scaleX, scaleY);
        if (backgroundImage.width < this.cameras.main.width) {
            backgroundImage.setX((this.cameras.main.width - backgroundImage.width) / 2);
        }
        super.create();
    }

    update() {
        super.update();
    }

}