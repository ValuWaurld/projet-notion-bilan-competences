import Dialogue from "../utils/dialogues/Dialogue";
import { GameScene } from "./GameScene";
import DialogueElement from "../utils/dialogues/DialogueElement";
import DialoguePerson from "../utils/dialogues/DialoguePerson";
import DialogueSpeaker from "../utils/dialogues/DialogueSpeaker";
import DialogueSpeech from "../utils/dialogues/DialogueSpeech";
import DialogueChoice from "../utils/dialogues/DialogueChoice";

const khaledSpeaker = new DialogueSpeaker()
    .setName("Khaled");

const dialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech(new DialogueSpeech().setText("Hello!").setEmotion("stressed")),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech(new DialogueSpeech().setEmotion("sighing"))
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech(new DialogueSpeech().setText("How are you?").setEmotion("smiling"))
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
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
                            .setAction((_) => console.log("Clicked 'No'"))
                    )
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech(new DialogueSpeech().setText("Cool. See you later!").setEmotion("smiling"))
            )
    );

export default class TestGameScene extends GameScene {

    constructor() {
        super({ key: "TestGameScene", dialogue });
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