import DialogueChoice from "./DialogueChoice";
import DialogueSpeaker from "./DialogueSpeaker";
import {KhaledEmotions, ValentinEmotions} from "../../scenes/TitleScene";

export default class DialoguePerson {

    public speaker: DialogueSpeaker | null;
    public speech: string | null;
    public emotion: string | null;
    public choices: DialogueChoice[];

    constructor(speaker?: DialogueSpeaker, speech?: string, emotion?: KhaledEmotions | ValentinEmotions, choices?: DialogueChoice[]) {
        this.speaker = speaker ?? null;
        this.speech = speech ?? null;
        this.emotion = emotion ?? null;
        this.choices = choices ?? [];
    }

    public setSpeaker(speaker: DialogueSpeaker) {
        this.speaker = speaker;
        return this;
    }

    public setSpeech(speech: string) {
        this.speech = speech;
        return this;
    }

    public setEmotion(emotion: KhaledEmotions | ValentinEmotions) {
        this.emotion = emotion;
        return this;
    }

    public setChoices(...choices: DialogueChoice[]) {
        this.choices = choices;
        return this;
    }

    public addChoice(choice: DialogueChoice) {
        this.choices.push(choice);
        return this;
    }

}