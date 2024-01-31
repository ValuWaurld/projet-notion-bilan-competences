import 'phaser';
import { BaseScene } from './BaseScene';
import Dialogue from '~/utils/dialogues/Dialogue';

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
    protected backgroundFrontImage: Phaser.GameObjects.Image | null = null;
    
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
        this.backgroundFrontImage?.destroy();
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
    
        const screenWidth = this.cameras.main.width;
        const personWidth = screenWidth / currentElement.people.length;
        const xOffset = 10; // petit décalage pour ne pas coller au bord de l'écran
    
        for (let personIndex = 0; personIndex < currentElement.people.length; personIndex += 1) {
            const person = currentElement.people[personIndex];
            const personObject: GameSceneObjects = {
                speechText: null,
                speakerImage: null,
                speakerName: null,
                choices: [],
                nextText: null
            };
    
            // Calculer la position X pour chaque personnage
            const xPosition = personIndex * personWidth + xOffset;
    
            personObject.speechText = this.add.text(xPosition, 40, person.speech?.text ?? "");
            personObject.speakerName = this.add.text(xPosition, 10, person.speaker?.name ?? "");
            const emotion = person.speech?.emotion;
            if (!emotion) throw new Error("No emotion found");
            const imageName = person.speaker?.name + "_" + emotion;
            personObject.speakerImage = this.add.image(xPosition + personWidth / 2, this.cameras.main.height * 53.5 / 100, imageName);
            personObject.speakerImage.setState
    
            personObject.choices = person.choices?.map((choice, i) => {
                const choiceText = this.add.text(xPosition + 50 * i, 70, choice.answer ?? "").setInteractive();
                choiceText.on('pointerdown', () => {
                    if (this.dialogue === null) return;
                    choice.action?.(this.dialogue);
                    if (choice.incrementAfterAction) this.dialogue.incrementIndex();
                });
                return choiceText;
            }) ?? [];
    
            personObject.nextText = this.add.text(xPosition, 100, "NEXT").setInteractive();
            personObject.nextText.on('pointerdown', () => {
                this.dialogue?.incrementIndex();
                console.log("Incremented dialogue index");
            });
    
            this.peopleObjects.push(personObject);
        }

        this.backgroundFrontImage = this.add.image(0, 0, "OfficeBackgroundFront").setOrigin(0, 0);
        const scaleY = this.cameras.main.height / this.backgroundFrontImage.height;
        const scaleX = this.cameras.main.width / this.backgroundFrontImage.width;
        this.backgroundFrontImage.setScale(scaleX, scaleY);

        console.log("Showing element number " + this.dialogue?.currentIndex);
    }
    
}

export { GameScene };