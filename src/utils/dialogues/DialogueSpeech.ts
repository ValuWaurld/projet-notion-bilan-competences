export default class DialogueSpeech {

    public text: string | null;

    constructor(text?: string) {
        this.text = text ?? null;
    }

    public setText(text: string) {
        this.text = text;
        return this;
    }

}