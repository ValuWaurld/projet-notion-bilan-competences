import 'phaser';

// Import scenes
import { BaseScene } from './scenes/BaseScene';
import { TitleScene } from './scenes/TitleScene';

// Import other classes
import { Align } from './utils/Align';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    scene: [TitleScene]
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