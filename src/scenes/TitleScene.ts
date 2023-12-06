import 'phaser';

export class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('hello', require('../assets/hello.gif'));
    }

    create() {
        this.add.image(400, 300, 'hello');
    }

}