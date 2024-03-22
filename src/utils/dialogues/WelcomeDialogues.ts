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
                    .setEmotion("stress"),
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Mais où est Valentin ?")
                    .setEmotion("stress"),
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("smile"),
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
                    .setSpeech("Êtes-vous prêt(e) ?.")
                    .setChoices(
                        new DialogueChoice()
                            .setAnswer("Oui")
                            .setIncrementAfterAction(true)
                            .setAction("QuestionsGameScene")
                    ),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("happy")
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