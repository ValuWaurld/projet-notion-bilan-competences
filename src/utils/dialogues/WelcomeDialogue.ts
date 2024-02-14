import Dialogue from "../structures/Dialogue";
import DialogueElement from "../structures/DialogueElement";
import DialoguePerson from "../structures/DialoguePerson";
import DialogueSpeech from "../structures/DialogueSpeech";
import DialogueChoice from "../structures/DialogueChoice";
import { khaledSpeaker } from "../Speakers";

export const welcomeDialogue = new Dialogue()
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
