import {khaledSpeaker, narratorSpeaker, valentinSpeaker} from "../Speakers";
import {questions, Question, Answer, AnswerWithDialogue} from "../Questions";
import Dialogue from "../structures/Dialogue";
import DialogueChoice from "../structures/DialogueChoice";
import DialogueElement from "../structures/DialogueElement";
import DialoguePerson from "../structures/DialoguePerson";

export function getQuestionsDialogue() {
    const randomizedQuestions = [...questions].sort(() => Math.random() - 0.5);
    console.log(randomizedQuestions);
    const answersGameScenes: AnswerWithDialogue[] = [];
    const questionsRootDialogue = new Dialogue()
        .addElements(
            ...randomizedQuestions.map((question: Question, qIndex) => getQuestionDialogue(question, qIndex, answersGameScenes))
        );
    return {questionsRootDialogue, answersGameScenes};
}

function getQuestionDialogue(question: Question, qIndex: number, answersGameScenes: AnswerWithDialogue[] = []) {
    return new DialogueElement()
        .setPeople(
            new DialoguePerson()
                .setSpeaker(narratorSpeaker)
                .setSpeech(question.question)
                .setChoices(...question.answers.map((answer: Answer, aIndex) => getChoiceDialogue(answer, qIndex, aIndex, answersGameScenes))),
            new DialoguePerson()
                .setSpeaker(khaledSpeaker)
                .setEmotion(question.khaledEmotion),
            new DialoguePerson()
                .setSpeaker(valentinSpeaker)
                .setEmotion(question.valentinEmotion)
        );
}

function getChoiceDialogue(answer: Answer, qIndex: number, aIndex: number, answersGameScenes: AnswerWithDialogue[] = []) {
    const answerGameSceneName = `Answer${qIndex}_${aIndex}GameScene`;
    const randomIndex = Math.floor(Math.random() * 2);

    const answerDialogue = new Dialogue()
        .addElements(
            new DialogueElement()
                .setPeople(
                    new DialoguePerson()
                        .setSpeaker(khaledSpeaker)
                        .setSpeech(randomIndex === 0 ? answer.khaledResponse : "")
                        .setEmotion(answer.khaledEmotion),
                    new DialoguePerson()
                        .setSpeaker(valentinSpeaker)
                        .setSpeech(randomIndex === 1 ? answer.valentinResponse : "")
                        .setEmotion(answer.valentinEmotion)
                ),
            new DialogueElement()
                .setPeople(
                    new DialoguePerson()
                        .setSpeaker(khaledSpeaker)
                        .setSpeech(randomIndex === 1 ? answer.khaledResponse : "")
                        .setEmotion(answer.khaledEmotion),
                    new DialoguePerson()
                        .setSpeaker(valentinSpeaker)
                        .setSpeech(randomIndex === 0 ? answer.valentinResponse : "")
                        .setEmotion(answer.valentinEmotion)
                )
        );

    answersGameScenes.push({...answer, dialogue: answerDialogue, gameSceneName: answerGameSceneName});
    return new DialogueChoice()
        .setAnswer(answer.value)
        .setAction(answerGameSceneName)
        .setIncrementAfterAction(true);
}