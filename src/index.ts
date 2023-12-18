import 'phaser';

// Import scenes
import { TitleScene } from './scenes/TitleScene';
import { GameScene } from './scenes/GameScene';
import { InterviewScene } from './scenes/InterviewScene';
import { MoralChoiceScene } from './scenes/MoralChoiceScene';
import { EndScene } from './scenes/EndScene';

// Import other classes
import { Align } from './utils/Align';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scene: [TitleScene, GameScene, InterviewScene, MoralChoiceScene, EndScene]
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const game = new Game(config);
    game.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
    Align.setGame(game);
};

new Phaser.Game(config);