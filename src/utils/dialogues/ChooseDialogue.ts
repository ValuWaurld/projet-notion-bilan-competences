import {khaledSpeaker, narratorSpeaker, valentinSpeaker} from "../Speakers";
import {questions, Question, Answer, AnswerWithDialogue} from "../Questions";
import Dialogue from "../structures/Dialogue";
import DialogueChoice from "../structures/DialogueChoice";
import DialogueElement from "../structures/DialogueElement";
import DialoguePerson from "../structures/DialoguePerson";

export const chooseDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("C'est la fin du jeu !"),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("happy")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech(`Vous avez répondu bon à %score% questions sur ${questions.length}.`),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("wink"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("call")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("Maintenant, qui choisirez-vous pour rejoindre votre équipe ?")
                    .setChoices(
                        new DialogueChoice()
                            .setAnswer("Khaled")
                            .setAction("KhaledGameScene"),
                        new DialogueChoice()
                            .setAnswer("Les deux")
                            .setAction("BothGameScene"),
                        new DialogueChoice()
                            .setAnswer("Valentin")
                            .setAction("ValentinGameScene")
                    ),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("stress"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("sweat")
            )
    );

export const khaledDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("Félicitations ! Vous avez choisi Khaled."),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("sad")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Merci énormément de m'avoir choisi. C'est un honneur de faire parti de votre entreprise !")
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
            )
    )

export const valentinDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("Félicitations ! Vous avez choisi Valentin."),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("sad"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("happy")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setSpeech("Merci énormément de m'avoir choisi. C'est un honneur de faire parti de votre entreprise !")
                    .setEmotion("call")
            )
    )

export const bothDialogue = new Dialogue()
    .addElements(
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(narratorSpeaker)
                    .setSpeech("Félicitations ! Vous avez choisi Khaled et Valentin."),
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setEmotion("happy")
            ),
        new DialogueElement()
            .setPeople(
                new DialoguePerson()
                    .setSpeaker(khaledSpeaker)
                    .setSpeech("Oh super, je suis ravi de rejoindre votre équipe !")
                    .setEmotion("happy"),
                new DialoguePerson()
                    .setSpeaker(valentinSpeaker)
                    .setSpeech("De même, je suis très heureux de faire parti de votre entreprise !")
                    .setEmotion("call")
            )
    )