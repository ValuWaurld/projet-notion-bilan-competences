import 'phaser';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('loading', require('../assets/loading.gif'));
    }

    create() {
        this.add.image(400, 300, 'loading');
        setTimeout(() => {
            this.scene.start('TitleScene');
        }, 2000);
    }
}