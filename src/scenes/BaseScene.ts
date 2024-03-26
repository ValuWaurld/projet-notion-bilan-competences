import "phaser";
import {Game} from '../index';

export default class BaseScene extends Phaser.Scene {
    public customGame: Game;

    constructor(customGame: Game, options?: string | Phaser.Types.Scenes.SettingsConfig) {
        super(options);
        this.customGame = customGame;
    }

}