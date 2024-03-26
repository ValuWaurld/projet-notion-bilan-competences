import 'phaser';

// Import other classes
import { Align } from './utils/Images';
import DeskGameScene from './scenes/DeskGameScene';
import QuestionsGameScene from './scenes/QuestionsGameScene';
import welcomeDialogue from './utils/dialogues/WelcomeDialogue';
import TitleScene from './scenes/TitleScene';
import { getQuestionsDialogue } from './utils/dialogues/QuestionsDialogues';
import { getRulesDialogue } from './utils/dialogues/RulesDialogue';
import { chooseDialogue, khaledDialogue, valentinDialogue, bothDialogue } from './utils/dialogues/ChooseDialogue';
import RightAnswerGameScene from './scenes/RightAnswerGameScene';
import EndScene from './scenes/EndScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scene: []
};

export class Game extends Phaser.Game {
    private score = 0;
    public isOver: boolean = false;

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }

    public getScore() {
        return this.score;
    }

    public incrementScore() {
        this.score++;
    }

    public resetScore() {
        this.score = 0;
    }
}

const addScenes = (game: Game) => {
    const titleScene = new TitleScene(game);
    game.scene.add("TitleScene", titleScene, true);
    const welcomeGameScene = new DeskGameScene(game, welcomeDialogue, "QuestionsGameScene");
    game.scene.add("WelcomeGameScene", welcomeGameScene, false);
    const rulesGameScene = new DeskGameScene(game, getRulesDialogue());
    game.scene.add("RulesGameScene", rulesGameScene, false);
    const { questionsRootDialogue, answersGameScenes } = getQuestionsDialogue();
    const questionsGameScene = new QuestionsGameScene(game, questionsRootDialogue, "ChooseGameScene");
    game.scene.add("QuestionsGameScene", questionsGameScene, false);
    for (const answerGameScene of answersGameScenes) {
        const answerGameSceneInstance = new (answerGameScene.correct ? RightAnswerGameScene : DeskGameScene)(game, answerGameScene.dialogue);
        game.scene.add(answerGameScene.gameSceneName, answerGameSceneInstance, false);
    }
    const chooseGameScene = new DeskGameScene(game, chooseDialogue);
    game.scene.add("ChooseGameScene", chooseGameScene, false);
    const khaledGameScene = new DeskGameScene(game, khaledDialogue, "EndScene");
    game.scene.add("KhaledGameScene", khaledGameScene, false);
    const bothGameScene = new DeskGameScene(game, bothDialogue, "EndScene");
    game.scene.add("BothGameScene", bothGameScene, false);
    const valentinGameScene = new DeskGameScene(game, valentinDialogue, "EndScene");
    game.scene.add("ValentinGameScene", valentinGameScene, false);
    const endScene = new EndScene(game);
    game.scene.add("EndScene", endScene, false);
};

window.onload = () => {
    const game = new Game(config);
    game.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
    Align.setGame(game);
    addScenes(game);
    game.scene.start("TitleScene");
};