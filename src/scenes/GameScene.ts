import 'phaser';
import { BaseScene } from './BaseScene';
import Dialogue from '~/utils/dialogues/Dialogue';

const PEOPLE_SEPARATOR_PIXELS = 500;

interface GameSceneOptions extends Phaser.Types.Scenes.SettingsConfig {
    dialogue: Dialogue;
}

interface GameSceneObjects {
    speechText: Phaser.GameObjects.Text | null;
    speakerImage: Phaser.GameObjects.Image | null;
    speakerName: Phaser.GameObjects.Text | null;
    choices: Phaser.GameObjects.Text[];
    nextText: Phaser.GameObjects.Text | null;
}

class GameScene extends BaseScene {

    public dialogue: Dialogue | null = null;
    protected oldIndex = 0;

    // Variables for showing current dialogue
    protected peopleObjects: GameSceneObjects[] = [];
    
    constructor(options?: string | GameSceneOptions | undefined) {
        super(options);
        
        if (options !== undefined && typeof options !== 'string' && 'dialogue' in options) {
            this.dialogue = options.dialogue;
            this.dialogue.setGameScene(this);
        }
    }

    create() {
        if (this.dialogue !== null) {
            this.dialogue.currentIndex = 0;
            this.showCurrentDialogue();
        }
    }
    
    removeOldObjects() {
        for (const personObjects of this.peopleObjects) {
            personObjects.speechText?.destroy();
            personObjects.speakerImage?.destroy();
            personObjects.speakerName?.destroy();
            personObjects.choices?.forEach((choice) => choice.destroy());
            personObjects.nextText?.destroy();
        }
        this.peopleObjects = [];
    }

    update() {
        if (this.dialogue !== null && this.oldIndex !== this.dialogue.currentIndex) {
            this.removeOldObjects();
            this.oldIndex = this.dialogue.currentIndex;
            this.showCurrentDialogue();
        }
    }

    async showCurrentDialogue() {
        if (this.dialogue === null) return;

        const currentElement = this.dialogue.getCurrentElement();
        if (currentElement === undefined) return;

        for (let personIndex = 0; personIndex < currentElement.people.length; personIndex += 1) {
            const person = currentElement.people[personIndex];
            const personObject: GameSceneObjects = {
                speechText: null,
                speakerImage: null,
                speakerName: null,
                choices: [],
                nextText: null
            };
            personObject.speechText = this.add.text(10 + PEOPLE_SEPARATOR_PIXELS * personIndex, 40, person.speech?.text ?? "");
            personObject.speakerName = this.add.text(10 + PEOPLE_SEPARATOR_PIXELS * personIndex, 10, person.speaker?.name ?? "");
            const emotion = person.speech?.emotion;
            if (!emotion) throw new Error("No emotion found");
            const imageName = person.speaker?.name + "_" + emotion;
            personObject.speakerImage = this.add.image(300 + PEOPLE_SEPARATOR_PIXELS * personIndex, 490, imageName);
            personObject.choices = person.choices?.map((choice, i) => {
                const choiceText = this.add.text(10 + 50 * i + PEOPLE_SEPARATOR_PIXELS * personIndex, 70, choice.answer ?? "").setInteractive();
                choiceText.on('pointerdown', () => {
                    if (this.dialogue === null) return;
                    choice.action?.(this.dialogue);
                    if (choice.incrementAfterAction) this.dialogue.incrementIndex();
                });
                return choiceText;
            }) ?? [];

            personObject.nextText = this.add.text(10 + PEOPLE_SEPARATOR_PIXELS * personIndex, 100, "NEXT").setInteractive();
            personObject.nextText.on('pointerdown', () => {
                this.dialogue?.incrementIndex();
                console.log("Incremented dialogue index");
            });

            this.peopleObjects.push(personObject);
        }

        console.log("Showing element number " + this.dialogue?.currentIndex);
    }
    
}

export { GameScene };