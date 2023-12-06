import 'phaser';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('forest', require('../assets/forest.png'));
        this.load.image('loading', require('../assets/loading.gif'));
    }

    create() {
        this.add.image(300, 300, 'loading');
        setTimeout(() => {
            this.scene.start('TitleScene');
        }, 2000);
    }
}