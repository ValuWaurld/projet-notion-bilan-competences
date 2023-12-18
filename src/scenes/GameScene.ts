import 'phaser';
import { BaseScene } from './BaseScene';
import Dialogue from '~/utils/dialogues/Dialogue';

interface GameSceneOptions extends Phaser.Types.Scenes.SettingsConfig {
    dialogue: Dialogue;
}

class GameScene extends BaseScene {

    public dialogue: Dialogue | null = null;
    protected oldIndex = 0;

    // Variables for showing current dialogue
    protected speechText: Phaser.GameObjects.Text | null = null;
    protected speakerImage: Phaser.GameObjects.Image | null = null;
    protected speakerName: Phaser.GameObjects.Text | null = null;
    protected choices: Phaser.GameObjects.Text[] = [];
    protected nextText: Phaser.GameObjects.Text | null = null;
    
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
        this.speechText?.destroy();
        this.speakerImage?.destroy();
        this.speakerName?.destroy();
        this.choices?.forEach((choice) => choice.destroy());
        this.nextText?.destroy();
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

        this.speechText = this.add.text(10, 40, currentElement.speech?.text ?? "");
        this.speakerName = this.add.text(10, 10, currentElement.speaker?.name ?? "");
        this.choices = currentElement.choices?.map((choice, i) => {
            const choiceText = this.add.text(10 + 50 * i, 70, choice.answer ?? "").setInteractive();
            choiceText.on('pointerdown', () => {
                if (this.dialogue === null) return;
                choice.action?.(this.dialogue);
                if (choice.incrementAfterAction) this.dialogue.incrementIndex();
            });
            return choiceText;
        }) ?? [];

        this.nextText = this.add.text(10, 100, "NEXT").setInteractive();
        this.nextText.on('pointerdown', () => {
            this.dialogue?.incrementIndex();
            console.log("Incremented dialogue index");
        });

        console.log("Showing element number " + this.dialogue?.currentIndex);
    }
    
}

export { GameScene };