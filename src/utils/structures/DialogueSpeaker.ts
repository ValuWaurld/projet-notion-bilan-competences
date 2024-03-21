export default class DialogueSpeaker {

    public name: string | null;

    constructor(name?: string) {
        this.name = name ?? null;
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

}