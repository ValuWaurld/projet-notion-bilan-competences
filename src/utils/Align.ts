import 'phaser';

export class Align {

    private static __game: Phaser.Game;

    public static setGame(game: Phaser.Game) {
        Align.__game = game;
    }

    private static get game(): Phaser.Game {
        if (Align.__game == null) {
            throw new Error('Align was not initialized');
        }
        return Align.__game;
    }

    public static scaleToGameW(img: Phaser.GameObjects.Image, per: number) { 
        img.displayWidth = Number(Align.game.config.width) * per;
        img.scaleY = img.scaleX;
    }

    public static centerH(img: Phaser.GameObjects.Image) {
        img.x = Number(Align.game.config.width) / 2;
    }

    public static centerV(img: Phaser.GameObjects.Image) {
        img.y = Number(Align.game.config.height) / 2;
    }

}