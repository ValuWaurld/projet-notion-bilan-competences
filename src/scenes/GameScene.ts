import 'phaser';
import {BaseScene} from './BaseScene';
import Dialogue from '../utils/structures/Dialogue';
import {Align} from '../utils/Images';
import DialogueElement from '~/utils/structures/DialogueElement';

const generateSpeechStyleOptions = (personWidth: number) => ({
    color: '#FFFFFF',
    wordWrap: {width: personWidth * 0.8, useAdvancedWrap: true},
    align: 'center'
})

interface GameSceneOptions extends Phaser.Types.Scenes.SettingsConfig {
    dialogue: Dialogue;
    endGameScene?: string;
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
    public previousGameScene: GameScene | null = null;
    public endGameScene: string | null = null;
    protected oldIndex = 0;

    // Variables for showing current dialogue
    protected peopleObjects: GameSceneObjects[] = [];
    protected cvObjects: Phaser.GameObjects.Image[] = [];
    protected backgroundFrontImage: Phaser.GameObjects.Image | null = null;

    constructor(options?: string | GameSceneOptions | undefined) {
        super(options);

        if (options !== undefined && typeof options !== "string") {
            if ('dialogue' in options && options.dialogue instanceof Dialogue) {
                this.dialogue = options.dialogue;
                this.dialogue?.setGameScene(this);
            }
            if ('endGameScene' in options && typeof options.endGameScene === "string") {
                this.endGameScene = options.endGameScene;
            }
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
        for (const cvObject of this.cvObjects) {
            cvObject.destroy();
        }
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
        if (currentElement === undefined) {
            this.scene.stop();
            if (this.previousGameScene !== null) {
                this.previousGameScene.scene.resume();
            } else if (this.endGameScene !== null) {
                const nextGameScene = this.game.scene.keys[this.endGameScene];
                if (!nextGameScene) throw new Error("Scene not found");
                nextGameScene.scene.start();
            }
            return;
        }

        const narrator = currentElement.people.find(person => person.speaker?.name === "Narrator");
        let hasNarratorTalked = false;
        for (let peopleIndex = 0; peopleIndex < currentElement.people.length; peopleIndex++) {
            this.showPersonDialogue(currentElement, peopleIndex, !!narrator, !narrator?.speech, hasNarratorTalked);
            if (narrator && currentElement.people[peopleIndex] === narrator) hasNarratorTalked = true;
        }

        this.backgroundFrontImage = this.add.image(0, 0, "OfficeBackgroundFront").setOrigin(0, 0);
        Align.scaleToGame(this.backgroundFrontImage, 1, false);

        this.showCV();

        console.log("Showing element number " + this.dialogue?.currentIndex);
    }

    showPersonDialogue(currentElement: DialogueElement, personIndex: number, isThereNarrator: boolean, isNarratorSilent: boolean, hasNarratorTalked: boolean) {
        const nbRealPeople = currentElement.people.length - (isThereNarrator && !isNarratorSilent ? 1 : 0);
        const personWidth = this.cameras.main.width / nbRealPeople;
        const person = currentElement.people[personIndex];
        const personObject: GameSceneObjects = {
            speechText: null,
            speechBackground: null,
            speakerImage: null,
            speakerName: null,
            choices: [],
            nextText: null
        };
        console.log(person.speaker?.name, person.speech, person.emotion, person.choices, nbRealPeople)

        const xPosition = (personIndex - (hasNarratorTalked ? 1 : 0)) * personWidth;
        let background = this.add.graphics({fillStyle: {color: 0x000000, alpha: 0.5}});

        if (person.speaker?.name === "Narrator") {
            if (person.speech) {
                personObject.speechBackground = background.fillRect(this.cameras.main.width * 0.05, 30, this.cameras.main.width * 0.9, 100);
                personObject.speechText = this.add.text(this.cameras.main.width / 2, person.choices.length === 0 ? 75 : 45, person.speech, generateSpeechStyleOptions(this.cameras.main.width));
                personObject.speechText.setOrigin(0.5, 0);
            }
        } else {
            // personObject.speakerName = this.add.text(xPosition + personWidth / 2, 35, person.speaker?.name ?? "", generateSpeechStyleOptions(personWidth));
            // personObject.speakerName.setOrigin(0.5, 0);
            if (!person.emotion && person.speaker?.name != "Narrator") throw new Error(`No emotion found (speaker: ${person.speaker?.name})`);
            if (person.emotion) {
                const imageName = person.speaker?.name + "_" + person.emotion;
                personObject.speakerImage = this.add.image(xPosition + personWidth / 2, this.cameras.main.height * 50 / 100, imageName);
                Align.scaleToGame(personObject.speakerImage, 1 / 2);
            }
            if (person.speech) {
                personObject.speechBackground = background.fillRect(xPosition + personWidth * 0.05, 30, personWidth * 0.9, 100);
                personObject.speechText = this.add.text(xPosition + personWidth / 2, 75, person.speech, generateSpeechStyleOptions(personWidth));
                personObject.speechText.setOrigin(0.5, 0);
            }
        }

        if (person.choices.length !== 0) {
            const choiceXOffset = this.cameras.main.width * 0.05;
            const choiceWidth = this.cameras.main.width * 0.9 / person.choices.length;
            personObject.choices = person.choices.map((choice, i) => {
                const choiceText = this.add.text(choiceXOffset + i * choiceWidth + choiceWidth / 2, 85, choice.answer ?? "", {color: '#FFFFFF'}).setInteractive();
                choiceText.on('pointerdown', () => {
                    if (this.dialogue === null) return;
                    if (choice.action) {
                        if (typeof choice.action === "string") {
                            console.log("Changing scene to " + choice.action)
                            console.log(this.game.scene);
                            const nextGameScene = this.game.scene.keys[choice.action];
                            console.log(nextGameScene);
                            if (!nextGameScene) throw new Error("Scene not found");
                            if (!(nextGameScene instanceof GameScene)) throw new Error("Scene is not a GameScene");
                            nextGameScene.previousGameScene = this;
                            this.scene.pause();
                            nextGameScene.scene.start();
                        } else {
                            choice.action(this.dialogue);
                        }
                    }
                    if (choice.incrementAfterAction) this.dialogue.incrementIndex();
                });
                return choiceText;
            });
        }

        if (personIndex === 0 && person.choices.length === 0) {
            personObject.nextText = this.add.text(this.cameras.main.width / 2, 200, "NEXT", {color: '#000000'}).setInteractive();
            personObject.nextText.on('pointerdown', () => {
                this.dialogue?.incrementIndex();
                console.log("Incremented dialogue index");
            });
        }

        this.peopleObjects.push(personObject);
    }

    showCV() {
        const names = ["Khaled", "Valentin"];
        const cameraWidth = this.cameras.main.width;
        const cameraHeight = this.cameras.main.height;
        for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
            const name = names[nameIndex];
            console.log("Showing CV for " + name);
            const cvImage = this.add.image(cameraWidth * 0.05 + (nameIndex * 0.9 * cameraWidth), cameraHeight * 0.9, name + "_CV").setOrigin(nameIndex, 1);
            Align.scaleToGame(cvImage, 0.1, true);

            cvImage.setInteractive();
            cvImage.on('pointerover', function () {
                Align.scaleToGame(cvImage, 0.7, true);
            });
            cvImage.on('pointerout', function () {
                Align.scaleToGame(cvImage, 0.1, true);
            });

            this.cvObjects.push(cvImage);
        }
    }

}

export {GameScene};