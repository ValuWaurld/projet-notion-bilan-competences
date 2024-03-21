import DialoguePerson from "./DialoguePerson";

export default class DialogueElement {

    public people: DialoguePerson[];

    constructor() {
        this.people = [];
    }

    public setPeople(...people: DialoguePerson[]) {
        this.people = people;
        return this;
    }

}