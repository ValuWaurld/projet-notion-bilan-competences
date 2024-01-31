export default class DialogueSpeech {

    public text: string | null;
    public emotion: string | null;

    constructor(text?: string, emotion?: string) {
        this.text = text ?? null;
        this.emotion = emotion ?? null;
    }

    public setText(text: string) {
        this.text = text;
        return this;
    }

    public setEmotion(emotion: string) {
        this.emotion = emotion;
        return this;
    }

}