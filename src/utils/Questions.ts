import Dialogue from "./structures/Dialogue";

export interface Answer {
  value: string;
  correct: boolean;
  khaledResponse: string;
  khaledEmotion: string;
  valentinResponse: string;
  valentinEmotion: string;
}

export interface AnswerWithDialogue extends Answer {
  dialogue: Dialogue;
  gameSceneName: string;
}

export interface Question {
  question: string;
  answers: Answer[];
  khaledEmotion: string;
  valentinEmotion: string;
}

export const questions: Question[] = [
  {
    question: "Who is the best ?",
    khaledEmotion: "smile",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: true,
        khaledResponse: "Correct! I'm the best!",
        khaledEmotion: "wink",
        valentinResponse: "Correct! Khaled is the best!",
        valentinEmotion: "happy"
      },
      {
        value: "Valentin",
        correct: false,
        khaledResponse: "Incorrect! Valentin is not the best!",
        khaledEmotion: "sad",
        valentinResponse: "Incorrect! I'm not the best!",
        valentinEmotion: "sweat"
      }
    ]
  }
]