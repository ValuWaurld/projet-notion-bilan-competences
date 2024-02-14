import 'phaser';
import { BaseScene } from './BaseScene';
import Dialogue from '../utils/structures/Dialogue';
import { Align } from '../utils/Images';
import DialogueElement from '~/utils/structures/DialogueElement';

const generateSpeechStyleOptions = (personWidth: number) => ({
    color: '#FFFFFF',
    wordWrap: { width: personWidth * 0.8, useAdvancedWrap: true },
    align: 'center'
})

interface GameSceneOptions extends Phaser.Types.Scenes.SettingsConfig {
    dialogue: Dialogue;
}

interface GameSceneObjects {
    speechText: Phaser.GameObjects.Text | null;
    speechBackground: Phaser.GameObjects.Graphics | null;
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
    protected backgroundFrontImage: Phaser.GameObjects.Image | null = null;
    
    constructor(options?: string | GameSceneOptions | undefined) {
        super(options);
        
        if (options !== undefined && typeof options !== 'string' && 'dialogue' in options && options.dialogue instanceof Dialogue) {
            this.dialogue = options.dialogue;
            this.dialogue?.setGameScene(this);
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
            this.removePersonObjects(personObjects);
        }
        this.peopleObjects = [];
        this.backgroundFrontImage?.destroy();
    }

    removePersonObjects(personObjects: GameSceneObjects) {
        personObjects.speechText?.destroy();
        personObjects.speechBackground?.destroy();
        personObjects.speakerImage?.destroy();
        personObjects.speakerName?.destroy();
        personObjects.choices?.forEach((choice) => choice.destroy());
        personObjects.nextText?.destroy();
    }

    update() {
        if (this.dialogue !== null && this.oldIndex !== this.dialogue.currentIndex) {
            this.removeOldObjects();
            this.oldIndex = this.dialogue.currentIndex;
            this.showCurrentDialogue();
        }
    }

    showCurrentDialogue() {
        if (this.dialogue === null) return;
    
        const currentElement = this.dialogue.getCurrentElement();
        if (currentElement === undefined) return;
        
        for (let personIndex = 0; personIndex < currentElement.people.length; personIndex += 1) {
            this.showPersonDialogue(currentElement, personIndex);
        }

        this.backgroundFrontImage = this.add.image(0, 0, "OfficeBackgroundFront").setOrigin(0, 0);
        Align.scaleToGame(this.backgroundFrontImage, 1, false);

        console.log("Showing element number " + this.dialogue?.currentIndex);
    }

    showPersonDialogue(currentElement: DialogueElement, personIndex: number) {
        const personWidth = this.cameras.main.width / currentElement.people.length;
        const person = currentElement.people[personIndex];
        const personObject: GameSceneObjects = {
            speechText: null,
            speechBackground: null,
            speakerImage: null,
            speakerName: null,
            choices: [],
            nextText: null
        };

        const xPosition = personIndex * personWidth;

        let background = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });
        personObject.speechBackground = background.fillRect(xPosition + personWidth * 0.05, 30, personWidth*0.9, 100);

        personObject.speechText = this.add.text(xPosition + personWidth / 2, 75, person.speech?.text ?? "", generateSpeechStyleOptions(personWidth));
        personObject.speechText.setOrigin(0.5, 0);
        if (person.speaker?.name !== "Narrator") {
            personObject.speakerName = this.add.text(xPosition + personWidth / 2, 35, person.speaker?.name ?? "", generateSpeechStyleOptions(personWidth));
            personObject.speakerName.setOrigin(0.5, 0);
            const emotion = person.speech?.emotion;
            if (!emotion) throw new Error("No emotion found");
            const imageName = person.speaker?.name + "_" + emotion;
            personObject.speakerImage = this.add.image(xPosition + personWidth / 2, this.cameras.main.height * 50 / 100, imageName);
            Align.scaleToGame(personObject.speakerImage, 1/2);
        }

        if (!person.choices || person.choices.length === 0) {
            personObject.nextText = this.add.text(xPosition + 10, 70, "NEXT", { color: '#FFFFFF' }).setInteractive();
            personObject.nextText.on('pointerdown', () => {
                this.dialogue?.incrementIndex();
                console.log("Incremented dialogue index");
            });
        } else {
            personObject.choices = person.choices?.map((choice, i) => {
                const choiceText = this.add.text(xPosition + 10 + 50 * i, 90, choice.answer ?? "", { color: '#FFFFFF' }).setInteractive();
                choiceText.on('pointerdown', () => {
                    if (this.dialogue === null) return;
                    choice.action?.(this.dialogue);
                    if (choice.incrementAfterAction) this.dialogue.incrementIndex();
                });
                return choiceText;
            }) ?? [];
        }

        this.peopleObjects.push(personObject);
    }
    
}

export { GameScene };