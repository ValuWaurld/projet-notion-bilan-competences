import DialogueChoice from "./DialogueChoice";
import DialogueSpeaker from "./DialogueSpeaker";
import DialogueSpeech from "./DialogueSpeech";

export default class DialoguePerson {

    public speaker: DialogueSpeaker | null;
    public speech: DialogueSpeech | null;
    public choices: DialogueChoice[];

    constructor(speaker?: DialogueSpeaker, speech?: DialogueSpeech, choices?: DialogueChoice[]) {
        this.speaker = speaker ?? null;
        this.speech = speech ?? null;
        this.choices = choices ?? [];
    }

    public setSpeaker(speaker: DialogueSpeaker) {
        this.speaker = speaker;
        return this;
    }

    public setSpeech(speech: DialogueSpeech) {
        this.speech = speech;
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