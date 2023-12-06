export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('forest', require('../assets/forest.png'));
        this.load.image('loading', require('../assets/loading.gif'));
    }

    create() {
        // Obtenir les dimensions de la caméra
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Centrer l'image 'loading' sur la scène
        this.add.image(width / 2, height / 2, 'loading');

        setTimeout(() => {
            this.scene.start('TitleScene');
        }, 2000);
    }
}
