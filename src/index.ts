import 'phaser';

// Import other classes
import { Align } from './utils/Images';
import DeskGameScene from './scenes/DeskGameScene';
import { noWelcomeDialogue, welcomeDialogue, yesWelcomeDialogue } from './utils/dialogues/WelcomeDialogues';
import { TitleScene } from './scenes/TitleScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scene: []
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

const addScenes = (game: Phaser.Game) => {
    const titleScene = new TitleScene();
    game.scene.add("TitleScene", titleScene, true);
    const welcomeGameScene = new DeskGameScene(welcomeDialogue);
    game.scene.add("WelcomeGameScene", welcomeGameScene, false);
    const yesWelcomeGameScene = new DeskGameScene(yesWelcomeDialogue);
    game.scene.add("YesWelcomeGameScene", yesWelcomeGameScene, false);
    const noWelcomeGameScene = new DeskGameScene(noWelcomeDialogue);
    game.scene.add("NoWelcomeGameScene", noWelcomeGameScene, false);
};

window.onload = () => {
    const game = new Game(config);
    game.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
    addScenes(game);
    Align.setGame(game);
    game.scene.start("TitleScene");
};