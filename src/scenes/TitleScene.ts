import 'phaser';

export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // Assurez-vous que l'image 'forest' est chargée ici si ce n'est pas déjà fait
    }

    create() {
        const forest = this.add.image(0, 0, 'forest').setOrigin(0, 0);

        const scaleX = this.cameras.main.width / forest.width;
        const scaleY = this.cameras.main.height / forest.height;
        const scale = Math.max(scaleX, scaleY);

        forest.setScale(scale);

        // Centrer l'image si nécessaire
        if (scale === scaleX) {
            forest.y = (this.cameras.main.height - forest.height * scale) / 2;
        } else {
            forest.x = (this.cameras.main.width - forest.width * scale) / 2;
        }
    }
}