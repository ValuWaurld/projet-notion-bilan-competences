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
    const [speakerA, speakerB] = randomIndex === 0 ? [khaledSpeaker, valentinSpeaker] : [valentinSpeaker, khaledSpeaker];
    const [emotionA, emotionB] = randomIndex === 0 ? [answer.khaledEmotion, answer.valentinEmotion] : [answer.valentinEmotion, answer.khaledEmotion];
    const [responseA, responseB] = randomIndex === 0 ? [answer.khaledResponse, answer.valentinResponse] : [answer.valentinResponse, answer.khaledResponse];

    const answerDialogue = new Dialogue()
        .addElements(
            new DialogueElement()
                .setPeople(
                    new DialoguePerson()
                        .setSpeaker(speakerA)
                        .setSpeech(responseA)
                        .setEmotion(emotionA),
                    new DialoguePerson()
                        .setSpeaker(speakerB)
                        .setEmotion(emotionB)
                ),
            new DialogueElement()
                .setPeople(
                    new DialoguePerson()
                        .setSpeaker(speakerA)
                        .setEmotion(emotionA),
                    new DialoguePerson()
                        .setSpeaker(speakerB)
                        .setSpeech(responseB)
                        .setEmotion(emotionB)
                )
        );

    answersGameScenes.push({...answer, dialogue: answerDialogue, gameSceneName: answerGameSceneName});
    return new DialogueChoice()
        .setAnswer(answer.value)
        .setAction(answerGameSceneName)
        .setIncrementAfterAction(true);
}