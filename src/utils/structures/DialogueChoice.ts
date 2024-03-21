import Dialogue from "./Dialogue";

type DialogueAction = ((dialogue: Dialogue) => void) | string | null;

export default class DialogueChoice {

    public answer: string | null;
    public action: DialogueAction | null;
    public incrementAfterAction: boolean;

    constructor(answer?: string, action?: DialogueAction, incrementAfterAction?: boolean) {
        this.answer = answer ?? null;
        this.action = action ?? null;
        this.incrementAfterAction = incrementAfterAction ?? true;
    }

    public setAnswer(answer: string) {
        this.answer = answer;
        return this;
    }

    public setAction(action: DialogueAction) {
        this.action = action;
        return this;
    }

    public setIncrementAfterAction(incrementAfterAction: boolean) {
        this.incrementAfterAction = incrementAfterAction;
        return this;
    }

}