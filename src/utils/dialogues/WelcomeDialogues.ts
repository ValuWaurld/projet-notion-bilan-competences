import Dialogue from "../structures/Dialogue";
import DialogueElement from "../structures/DialogueElement";
import DialoguePerson from "../structures/DialoguePerson";
import DialogueChoice from "../structures/DialogueChoice";
import {khaledSpeaker, narratorSpeaker, valentinSpeaker} from "../Speakers";

export const welcomeDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Bonjour !")
                    .setEmotion("stressed"),
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Mais où est Valentin ?")
                    .setEmotion("stressed"),
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("smiling"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setSpeech("Oups, désolé du retard...")
                    .setEmotion("sweat")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("Pas de soucis. Commençons !"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("happy")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("Réponds par oui ou non.")
                    .setChoices(
                        new DialogueChoice()
                            .setAnswer("Yes")
                            .setIncrementAfterAction(true)
                            .setAction("YesWelcomeGameScene"),
                        new DialogueChoice()
                            .setAnswer("No")
                            .setIncrementAfterAction(true)
                            .setAction("NoWelcomeGameScene")
                    ),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("angry")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("À bientôt !")
                    .setEmotion("winking")
            )
    );

export const yesWelcomeDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Cool !")
                    .setEmotion("smiling")
            )
    );

export const noWelcomeDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Oh, d'accord...")
                    .setEmotion("sad")
            )
    );