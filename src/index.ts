import 'phaser';

// Import other classes
import { Align } from './utils/Images';
import DeskGameScene from './scenes/DeskGameScene';
import { noWelcomeDialogue, welcomeDialogue, yesWelcomeDialogue } from './utils/dialogues/WelcomeDialogues';
import { TitleScene } from './scenes/TitleScene';
import { getQuestionsDialogue } from './utils/dialogues/QuestionsDialogues';

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
    const { questionsRootDialogue, answersGameScenes } = getQuestionsDialogue();
    const questionsGameScene = new DeskGameScene(questionsRootDialogue);
    game.scene.add("QuestionsGameScene", questionsGameScene, false);
    for (const answerGameScene of answersGameScenes) {
        const answerGameSceneInstance = new DeskGameScene(answerGameScene.dialogue);
        game.scene.add(answerGameScene.gameSceneName, answerGameSceneInstance, false);
    }
};

window.onload = () => {
    const game = new Game(config);
    game.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
    Align.setGame(game);
    addScenes(game);
    game.scene.start("TitleScene");
};