import 'phaser';
import { Align } from '../utils/Align';

export class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {

    }

    create() {
        const forest = this.add.image(0, 0, 'forest');
        Align.scaleToGameW(forest, 1);
    }

}