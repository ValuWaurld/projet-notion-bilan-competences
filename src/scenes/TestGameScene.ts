import Dialogue from "../utils/dialogues/Dialogue";
import { GameScene } from "./GameScene";
import DialogueElement from "../utils/dialogues/DialogueElement";
import DialogueSpeaker from "../utils/dialogues/DialogueSpeaker";
import DialogueSpeech from "../utils/dialogues/DialogueSpeech";
import DialogueChoice from "../utils/dialogues/DialogueChoice";

const valentinSpeaker = new DialogueSpeaker()
    .setName("Valentin");

const dialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setSpeaker(valentinSpeaker)
            .setSpeech(new DialogueSpeech().setText("Hello!").setEmotion("happy")),
        new DialogueElement()
            .setSpeaker(valentinSpeaker)
            .setSpeech(new DialogueSpeech().setText("How are you?").setEmotion("smiling")),
        new DialogueElement()
            .setSpeaker(valentinSpeaker)
            .setSpeech(new DialogueSpeech().setText("Do you want to play a game?").setEmotion("thinking"))
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
            .setSpeaker(valentinSpeaker)
            .setSpeech(new DialogueSpeech().setText("Cool. See you later!").setEmotion("smiling")),
    );

export default class TestGameScene extends GameScene {

    constructor() {
        super({ key: "TestGameScene", dialogue });
    }

    create() {
        super.create();
    }

    update() {
        super.update();
    }

}