export default class DialogueSpeaker {

    public name: string | null;
    public emotion: string | null;

    constructor(name?: string, emotion?: string) {
        this.name = name ?? null;
        this.emotion = emotion ?? null;
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setEmotion(emotion: string) {
        this.emotion = emotion;
        return this;
    }

}